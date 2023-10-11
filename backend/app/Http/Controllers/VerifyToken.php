<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class VerifyToken extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
       public function verify(Request $request){
        $expressApiUrl = env('WEB3AUTH_VERIFY_ENDPOINT');

        $idToken = $request->bearerToken();
        $appPubKey = $request->input('app_pub_key');
//        $idToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRZT2dnXy01RU9FYmxhWS1WVlJZcVZhREFncHRuZktWNDUzNU1aUEMwdzAifQ.eyJpYXQiOjE2OTY0NDk5MTcsImF1ZCI6IkJQaTVQQl9VaUlaLWNQejFHdFY1aTFJMmlPU09IdWltaVhCSTBlLU9lX3U2WDNvVkFiQ2lBWk9URUJ0VFh3NHRzbHVUSVRQcUE4ek1zZnhJS01qaXFOUSIsIm5vbmNlIjoiMDM5NmFhM2M5NDc3N2YxYjNjMDE2NDhhNGYyNmU1YmFkYmJhZmJmZTI1ODIwMGMwOTVkM2FiYTk2NWZjODFlNTM2IiwiaXNzIjoiaHR0cHM6Ly9hcGktYXV0aC53ZWIzYXV0aC5pbyIsIndhbGxldHMiOlt7InB1YmxpY19rZXkiOiIwMmU5Yjg5NmM1Yzg3MmFkOTljZTY1NjI5MmEzZGFlNjRiZWIzZjQxZWQ4MGJlMDBlZTkzYzg5Yjk3ZmFhYmY4NTQiLCJ0eXBlIjoid2ViM2F1dGhfYXBwX2tleSIsImN1cnZlIjoic2VjcDI1NmsxIn1dLCJlbWFpbCI6Imdma2FjaWRAZ21haWwuY29tIiwibmFtZSI6IklvYW5uaXMgUGFuYWdpb3RvcG91bG9zIiwicHJvZmlsZUltYWdlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzY1MUN1TFpRNlZtVEwtXy1OSVh5X2lsbTRZM0oyU1JfeTBtM1BROU5GPXM5Ni1jIiwidmVyaWZpZXIiOiJ3ZWIzYXV0aCIsInZlcmlmaWVySWQiOiJnZmthY2lkQGdtYWlsLmNvbSIsImFnZ3JlZ2F0ZVZlcmlmaWVyIjoid2ViM2F1dGgtZ29vZ2xlLXNhcHBoaXJlIiwiZXhwIjoxNjk2NTM2MzE3fQ.D0LWlQg1nTJD3zNHX26bOBrFIEVGWLtaor4CkX1qQIOLxEqPg1sfZgNM2KNApJd089GegFdRO4yTGg3AVtu2FQ';
//        $appPubKey = '02e9b896c5c872ad99ce656292a3dae64beb3f41ed80be00ee93c89b97faabf854';

        if(empty($idToken) || empty($appPubKey)){
            return response()->json(['error' => 'missing token or public key'],400);
        }

        $response = Http::post($expressApiUrl, [
            'idToken' => $idToken,
            'app_pub_key' => $appPubKey,
//            'apiKey' => $apiKey,
        ]);

        $result = $response->json();
//        dd($result['decodedJWT']);
        if ($response->successful()) {
            //token is verified, now check if user exists
            $user = User::where('pubkey',$appPubKey)->first();
            $new_registration = false;
            if(empty($user)){
                $userService = new UserService();
                $username = $userService->generateUsername($result['decodedJWT']['payload']);
                // check email uniqueness
                $mailCheck = User::where('email',$result['decodedJWT']['payload']['email'])->first();
                if(!empty($mailCheck)){
                    return response()->json(['error' => 'Email already registered. Please log in using '.config('auth.aggregate_identifiers')[$result['decodedJWT']['payload']['aggregateVerifier']]],500);
                }
                $image = $userService->getImageForNewUser($result['decodedJWT']['payload']);
                $user = new User([
                    'username' => $username,
                    'pubkey' => $appPubKey,
                    'idToken' => $idToken,
                    'email' => $result['decodedJWT']['payload']['email'],
//                    'aggregate_verifier' => $result['decodedJWT']['payload']['aggregateVerifier'],
                    'image' => $image,
                    'wallet_address' => $appPubKey
                ]);
                $user->save();
                $new_registration = true;
            }
            return response()->json(['user'=>$user, 'new_registration' => $new_registration],200);
        }

        return response()->json(['error' => 'Could not verify access token.'],500);

    }

}
