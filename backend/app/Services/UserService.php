<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
class UserService{

    public function generateUsername($data){
        $username = '';
        if(isset($data['name'])){
            // infer username from OAuth provided name
        }else if(isset($data['email'])){
            //
        }else{
            // generate a random username
        }
        // check if username exists
        while(!empty(User::where('username',$username)->first())){
            $username = $this->appendRandomness($username);
        }
        return $username;

    }

    public function getImageForNewUser($data){
        if(isset($data['profileImage'])){
            return $data['profileImage'];
        }
        return asset(config('app.default_profile_image'));
    }

    private function appendRandomness($name){
        return $name.Str::random(3);
    }

    private function getRandomUsername(){
        // generate a random name
    }
}
