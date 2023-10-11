<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Stripe\StripeClient;
class StripeController extends Controller
{
    private $stripe;
    public function __construct(){
        $this->stripe = new StripeClient(env('STRIPE_SECRET'));
    }
    public function startSession(Request $request){
        try{
            $transaction_details = $request->input('transaction_details');
            if(empty($transaction_details)){
                return response()->json(['error' => 'missing transaction_details'],400);
            }
            $params = [
                'transaction_details' => [
                    'destination_currency' => $transaction_details['destination_currency'],
                    'destination_exchange_amount' => $transaction_details['destination_exchange_amount'],
                    'destination_network' => $transaction_details['destination_network'],
                ],
                'customer_ip_address' => $_SERVER['REMOTE_ADDR']
            ];
            $onrampSession = $this->stripe->request('post', '/v1/crypto/onramp_sessions', $params, []);
            $output = [
                'clientSecret' => $onrampSession->client_secret,
            ];
            return response()->json($output,200);
        } catch (\Error $e){
            return response()->json(['error' => $e],500);
        }

    }

}
