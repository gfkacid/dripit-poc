<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Drop;
use App\Models\NFT;
use App\Models\RoyaltyRound;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function show(Request $request){
        $token = $request->bearerToken();
        $decodedJWT = (json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1])))));

        $user = User::where('idToken',$token)->first();
        if(empty($user) || $user->verifier_id != $decodedJWT->verifierId){
            return new ModelNotFoundException('User not found / token mismatch',500);
        }

        $userDrops = $user->nfts_owned()->pluck('drop_id')->unique()->toArray();
        $holdings = $user->nfts_owned();
        $royaltyRounds = RoyaltyRound::whereIn('drop_id',$userDrops)->with(['drop.track.artist','transactions' => function($q) use($user){
            return $q->where('user_id',$user->id);
        }])->orderByDesc('period_end')->get();

        $claims = [];

        foreach($royaltyRounds as $round){
            $ownedTokens = $holdings->where('drop_id',$round->drop_id)->count();
            $totalTokens = NFT::where('drop_id',$round->drop_id)->count();
            $claims[] = [
                'claim_id' => $round->id,
                'royalty_round_id' => $round->royalty_round_id,
                'track_name' => $round->drop->track->name.' - '.$round->drop->track->artist->name,
                'track_image' => $round->drop->track->image,
                'owned_tokens' => $ownedTokens,
                'period_start' => $round->period_start,
                'period_end' => $round->period_end,
                'payout' => $round->amount * $ownedTokens / $totalTokens,
                'claimed' => (count($round->transactions) > 0)
            ];
        }
        return response()->json(['claims' => $claims],200);
    }

    public function claim(Request $request){
        $token = $request->bearerToken();
        $decodedJWT = (json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1])))));

        $user = User::where('idToken',$token)->first();
        if(empty($user) || $user->verifier_id != $decodedJWT->verifierId){
            return new ModelNotFoundException('User not found / token mismatch',500);
        }
        $claim_id = $request->input('claim_id');
        if(!$request->filled('claim_id')){
            return response()->json(['error' => 'missing claim id'],500);
        }

        $transaction = Transaction::where('user_id',$user->id)->where('type','claim')->where('royalty_round_id',$claim_id)->first();

        if(empty($transaction)){
            $transaction = new Transaction([
                'hash' => '123',
                'type' => 'claim',
                'date' => Carbon::now(),
                'user_id' => $user->id,
                'value_usd' => $request->input('value'),
                'royalty_round_id' => $claim_id,
            ]);
            $transaction->save();
        }else{
            response()->json(['error' => 'claim transaction already registered'],500);
        }
        return response()->json(['transaction' => $transaction],200);
    }

    public function mintToken(Request $request){
        $token = $request->bearerToken();
        $decodedJWT = (json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1])))));

        $user = User::where('idToken',$token)->first();
        if(empty($user) || $user->verifier_id != $decodedJWT->verifierId){
            return new ModelNotFoundException('User not found / token mismatch',500);
        }
        $drop_id = $request->input('drop_id');
        if(!$request->filled('drop_id')){
            return response()->json(['error' => 'missing drop id'],500);
        }
        $drop = Drop::where('id',$drop_id)->with('track')->first();
        $token_ids = $request->input('token_ids');
        if(!$request->filled('token_ids')){
            return response()->json(['error' => 'missing token ids'],500);
        }
        $nfts = NFT::where('minted_by',$user->id)->where('drop_id',$drop_id)->whereIn('token_id',$token_ids)->get();
        $minted_token_ids = array_values(array_diff($token_ids,$nfts->pluck('token_id')->toArray()));
        $minted_nfts = [];
        $transactions = [];
        foreach ($minted_token_ids as $minted_token_id){
            $nft = new NFT([
                'token_id' => $minted_token_id,
                'image' => $drop->track->image,
                'minted_at' => Carbon::now(),
                'drop_id' => $drop_id,
                'minted_by' => $user->id,
                'owner_id' => $user->id,
            ]);
            $nft->save();
            $minted_nfts[] = $nft;

            $transaction = new Transaction([
                'hash' => '123',
                'type' => 'mint',
                'date' => Carbon::now(),
                'user_id' => $user->id,
                'nft_id' => $nft->id,
                'value_usd' => $drop->price
            ]);
            $transaction->save();
            $transactions[] = $transaction;
        }
        // Update Drop
        $drop->minted = $drop->minted + count($minted_nfts);
        if($drop->minted === $drop->supply)$drop->sold_out = true;
        $drop->save();

        return response()->json(['nfts' => $minted_nfts, 'transactions' => $transactions],200);

    }
}
