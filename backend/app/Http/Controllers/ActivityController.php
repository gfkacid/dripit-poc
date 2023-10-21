<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends Controller
{

    public function latest(Request $request){
        $limit = 10;
        if($request->has('perPage')){
            $limit = $request->get('perPage');
        }

        $transactions = Transaction::with(['nft.drop.track.artist', 'user','royaltyRound.drop.track'])
            ->orderByDesc('date')
            ->limit($limit)
            ->get();

        $latest_activity = $transactions->map(function ($transaction) {
            if($transaction->type == 'mint'){
                return [
                    'type' => $transaction->type,
                    'track' => [
                        'name' => $transaction->nft->drop->track->name,
                        'image' => $transaction->nft->drop->track->image,
                    ],
                    'artist_name' => $transaction->nft->drop->track->artist->name,
                    'date' => $transaction->date,
                    'user' => [
                        'username' => $transaction->user->username,
                        'image' => $transaction->user->image,
                    ],
                    'usd_value' => $transaction->usd_value,
                ];
            }else{
                return [
                    'type' => $transaction->type,
                    'track' => [
                        'name' => $transaction->royaltyRound->drop->track->name,
                        'image' => $transaction->royaltyRound->drop->track->image,
                    ],
                    'date' => $transaction->date,
                    'user' => [
                        'username' => $transaction->user->username,
                        'image' => $transaction->user->image,
                    ],
                    'usd_value' => $transaction->usd_value,
                ];
            }
        });

        return response()->json($latest_activity);
    }

    public function topCollectors(){
        $collectors = User::withCount('nfts_owned')
//            ->select('users.username','users.image','nfts_owned_count')
            ->orderByDesc('nfts_owned_count')->get();
        return response()->json($collectors);
    }

}
