<?php

namespace App\Http\Controllers;

use App\Models\Drop;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class DropsController extends Controller
{
    public function latest(){
        $drops = Drop::where('published',1)->with(['track.artist'])->orderByDesc('starts_at')->limit(8)->get();
        return response()->json($drops);
    }

    public function show($slug='blinded-by-the-light'){
        if(empty($slug))return new ModelNotFoundException('Drop not found');
        $drop = Drop::where('slug',$slug)->with(['track.artist.latestExtras','collectors'])->first();
        $drop->extras = json_decode($drop->extras,true);
        return $drop;
    }

    public function collectors($id){
        $drop = Drop::findOrFail($id);
        return $drop->collectors;
    }
}
