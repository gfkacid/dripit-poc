<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Drop;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show($handle){

        $user = User::where('username',$handle)->withCount('nfts_owned as tokens_count')->firstOrFail();
        $user->load(['nfts_owned.drop.track.artist']);
        $user->artists_count = Artist::selectRaw('COUNT(DISTINCT artists.id) as count')
            ->join('tracks', 'artists.id', '=', 'tracks.artist_id')
            ->join('drops', 'tracks.id', '=', 'drops.track_id')
            ->join('nfts', 'drops.id', '=', 'nfts.drop_id')
            ->where('nfts.owner_id', $user->id)
            ->value('count');

        return $user;
    }
}
