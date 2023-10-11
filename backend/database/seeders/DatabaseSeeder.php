<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // USERS
         \App\Models\User::create([
             'username' => 'acid',
             'email' => 'acid@gmail.com',
             'image' => asset('media/user.png'),
             'pubkey' => '',
             'idToken' => '',
             'wallet_address' => ''
         ]);
        \App\Models\User::create([
            'username' => 'Broski',
            'email' => 'broski@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'rolo',
            'email' => 'rolo@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'axl',
            'email' => 'axl@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'mee6',
            'email' => 'mee6@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'pertubator',
            'email' => 'pertubator@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'dokken',
            'email' => 'dokken@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);
        \App\Models\User::create([
            'username' => 'collector',
            'email' => 'collector@gmail.com',
            'image' => asset('media/user.png'),
            'pubkey' => '',
            'idToken' => '',
            'wallet_address' => ''
        ]);

        // ARTISTS
        \App\Models\Artist::create([
            'name' => 'L Professor',
            'handle' => 'L_professor',
            'image' => asset('media/600x600.jpg'),
            'cover' => asset('media/1800x540.jpg'),
            'bio' => 'Artist bio...',
            'spotify_id' => '0yqgJJIjuNyBgzrSC9HbOp',
        ]);
        \App\Models\Artist::create([
            'name' => 'ITPDWIP',
            'handle' => 'ITPDWIP',
            'image' => asset('media/600x600.jpg'),
            'cover' => asset('media/1800x540.jpg'),
            'bio' => 'Artist bio...',
            'spotify_id' => '4RTe3KTTeWj9bHtZ7dgJeN',
        ]);

        // TRACKS
        \App\Models\Track::create([
            'name' => 'Special',
            'image' => asset('media/600x600.jpg'),
            'cover' => asset('media/1800x540.jpg'),
            'isrc' => 'USKO11800221',
            'spotify_id' => '4hJThuPp1QkjvpW83nJFHF',
            'youtube_id' => '',
            'sample_url' => asset('media/sample.mp3'),
            'artist_id' => 1,
            'released_at' => '2021-08-01'
        ]);
        \App\Models\Track::create([
            'name' => 'Blinded By The Light',
            'image' => asset('media/600x600.jpg'),
            'cover' => asset('media/1800x540.jpg'),
            'isrc' => 'USKO11800222',
            'spotify_id' => '7zc0x7i8eouXg3ITulLbRr',
            'youtube_id' => '',
            'sample_url' => asset('media/sample.mp3'),
            'artist_id' => 2,
            'released_at' => '2019-11-22'
        ]);

        // DROPS
        \App\Models\Drop::create([
            'contract' => '0x123123abcabc',
            'slug' => 'special',
            'price' => 1000,
            'royalties_share' => 25,
            'extras' => ['first_dibs' => true, 'virtual_event' => true],
            'starts_at' => '2023-09-01',
            'ends_at' => '2023-09-10',
            'supply' => 100,
            'minted' => 100,
            'legal_url' => '#',
            'sold_out' => 1,
            'published' => 1,
            'track_id' => 1,
        ]);
        \App\Models\Drop::create([
            'contract' => '0x456456456',
            'slug' => 'blinded-by-the-light',
            'price' => 1000,
            'royalties_share' => 25,
            'extras' => json_encode(['first_dibs' => true, 'virtual_event' => false]),
            'starts_at' => '2023-09-30',
            'ends_at' => '2023-10-10',
            'supply' => 100,
            'minted' => 0,
            'legal_url' => '#',
            'sold_out' => 0,
            'published' => 1,
            'track_id' => 2,
        ]);

        // NFTs
        for($i=1;$i<=100;$i++){
            $user = rand(1,8);
            $date = Carbon::createFromDate('2023-09-01')->addDays(rand(0,9))->addSeconds(rand(0,86400));
            \App\Models\NFT::create([
                'token_id' => $i,
                'image' => asset('media/600x600.jpg'),
                'minted_at' => $date,
                'drop_id' => 1,
                'minted_by' => $user,
                'owner_id' => $user,
            ]);
            Transaction::create([
                'hash' => '0x123',
                'type' => 'mint',
                'date' => $date,
                'value_usd' => null,
                'user_id' => $user,
                'nft_id' => $i,
                'royalties_id' => null,
            ]);
        }

        // ROYALTIES


        // TRANSACTIONS

    }
}
