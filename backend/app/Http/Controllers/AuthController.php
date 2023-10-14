<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
class AuthController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
       public function registerUser(Request $request){
        $expressApiUrl = env('WEB3AUTH_VERIFY_ENDPOINT');

        $idToken = $request->bearerToken();
        $appPubKey = $request->input('app_pub_key');

        if(empty($idToken) || empty($appPubKey)){
            return response()->json(['error' => 'missing token or public key'],400);
        }

        $response = Http::post($expressApiUrl, [
            'idToken' => $idToken,
            'app_pub_key' => $appPubKey,
//            'apiKey' => $apiKey,
        ]);

        $result = $response->json();
        if ($response->successful()) {
            //token is verified, now check if user exists
            $user = User::where('pubkey',$appPubKey)->first();
            if(empty($user)){
                $payload = $result['decodedJWT']['payload'];
                $username = $request->input('username');
                $email = $request->input('email',$payload['email']);
                $eoa = $request->input('eoa');

                // check unique fields
                $user = User::where('email',$email)->orWhere('verifier_id',$payload['verifierId'])->orWhere('eoa',$eoa)->first();

                if(!empty($user)){
                    return response()->json(['error' => 'User already registered. Please log in using '.config('auth.aggregate_identifiers')[$payload['aggregateVerifier']]],500);
                }

                $request->validate([
                    'image' => 'image|mimes:jpeg,png,gif|max:5120', // Max size in kilobytes (5MB)
                ]);
                $image = $request->file('image');
                if(!empty($image)){

                    $filename = $username . '_' . time() . '.' . $image->getClientOriginalExtension();
                    $storagePath = public_path('media/users/' . $filename);

                    $image = Image::make($image);
                    $image->fit(500, 500);
                    $image->save($storagePath);
                    $assetPath = asset('media/users/'.$filename);
                }else{
                    $userService = new UserService();
                    $assetPath = $userService->getImageForNewUser($payload);
                }

                $user = new User([
                    'username' => $username,
                    'email' => $email,
                    'image' => $assetPath,
                    'pubkey' => $appPubKey,
                    'idToken' => $idToken,
                    'verifier_id' => $payload['verifierId'],
                    'aggregate_verifier' => $payload['aggregateVerifier'],
                    'eoa' => $eoa,
                    'safe' => $request->input('safe','')
                ]);
                $user->save();
                return response()->json(['user'=>$user],200);
            }else{
                return response()->json(['error'=> 'Token is valid but user is already registered!','user' => $user],500);

            }

        }

        return response()->json(['error' => 'Could not verify access token.'],500);

    }

    public function checkUser(Request $request){
           $eoa = $request->input('eoa');
           $idToken = $request->bearerToken();
           if(empty($eoa)){
               return response()->json(['error' => 'EOA missing'],500);
           }
           if(empty($idToken)){
               return response()->json(['error' => 'idToken missing'],500);
           }
           $isRegistered = false;
           $user = User::where('eoa',$eoa)->first();
           if(!empty($user)){
               $isRegistered = true;
               if($user->idToken !== $idToken){
                   $user->idToken = $idToken;
                   $user->save();
               }
           }

           return response()->json(['user' => $user, 'isRegistered' => $isRegistered],200);
    }

}
