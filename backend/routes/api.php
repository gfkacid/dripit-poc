<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DropsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArtistsController;
use App\Http\Controllers\ActivityController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

// Auth
Route::post('register-user',[AuthController::class,'registerUser']);
Route::post('check-user',[AuthController::class,'checkUser']);
Route::put('update-settings',[AuthController::class,'updateSettings']);

// Marketplace
Route::get('/latest-drops', [DropsController::class,'latest']);
Route::get('/latest-activity', [ActivityController::class,'latest']);
Route::get('/top-collectors', [ActivityController::class,'topCollectors']);
Route::get('/drop/{slug}', [DropsController::class,'show']);
Route::get('/artist/{handle}', [ArtistsController::class,'show']);
Route::get('/profile/{handle}',[ProfileController::class,'show']);
Route::get('/slider',[\App\Http\Controllers\SliderController::class,'slider']);
Route::get('');

// Payments
Route::post('/stripe-session',[StripeController::class,'startSession']);

// Authorized
Route::get('/portfolio',[]);
