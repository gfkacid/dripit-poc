<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Drop;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show($handle='collector'){

        $user = User::where('username',$handle)->with([
            'nfts_owned:id,image,token_id,drop_id,owner_id',
            'nfts_owned.drop:id,slug,track_id',
            'nfts_owned.drop.track:id,name,cover,artist_id',
            'nfts_owned.drop.track.artist:id,name,handle',
            'transactions' => function($q){
                return $q->with(['nft:id,token_id,drop_id','nft.drop:id,track_id','nft.drop.track:id,name']);
            }])
            ->withCount('nfts_owned as tokens_count')
            ->firstOrFail();
        $user->artists_count = Artist::selectRaw('COUNT(DISTINCT artists.id) as count')
            ->join('tracks', 'artists.id', '=', 'tracks.artist_id')
            ->join('drops', 'tracks.id', '=', 'drops.track_id')
            ->join('nfts', 'drops.id', '=', 'nfts.drop_id')
            ->where('nfts.owner_id', $user->id)
            ->value('count');

        return $user;
    }
}
