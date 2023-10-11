<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function slider(){
        $slides = [
            ['type' => 'image', 'source' => public_path('media/slider/1.png'), 'link' => '#'],
            ['type' => 'video', 'source' => public_path('media/slider/2.mp4'), 'link' => '#'],
            ['type' => 'video', 'source' => public_path('media/slider/3.mp4'), 'link' => '#'],

        ];
        return response()->json($slides);
    }

}
