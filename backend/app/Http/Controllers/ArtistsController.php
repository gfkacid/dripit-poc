<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Drop;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ArtistsController extends Controller
{
    public function all(){
        $artists = Artist::all();
        return response()->json($artists);
    }

    public function show($handle){
        $artist = Artist::where('handle',$handle)->with(['tracks.drop'])->firstOrFail();
        $artist->collectors_count = User::whereHas('nfts_owned',function(Builder $q) use($artist){
           $q->whereHas('drop',function(Builder $q) use($artist){
               $q->whereHas('track',function(Builder $q) use($artist){
                   $q->where('artist_id',$artist->id);
               });
           });
        })->distinct('users.id')->count();
        $artist->drops_count = Drop::whereHas('track',function($q) use($artist){
            $q->where('artist_id',$artist->id);
        })->distinct('drops.id')->count();
        return $artist;
    }
}
