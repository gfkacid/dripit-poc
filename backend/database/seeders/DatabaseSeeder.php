<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\RoyaltyRound;
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
//         \App\Models\User::create([
//             'username' => 'acid',
//             'email' => 'acid@gmail.com',
//             'image' => asset('media/users/user.png'),
//             'pubkey' => '',
//             'idToken' => '',
//             'verifier_id' => 'acid@gmail.com',
//             'aggregate_verifier' => 'tkey-google-lrc',
//             'eoa' => '',
//             'safe' => ''
//         ]);
//        \App\Models\User::create([
//            'username' => 'Broski',
//            'email' => 'broski@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'broski@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'rolo',
//            'email' => 'rolo@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'rolo@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'axl',
//            'email' => 'axl@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'axl@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'mee6',
//            'email' => 'mee6@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'mee6@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'pertubator',
//            'email' => 'pertubator@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'pertubator@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'dokken',
//            'email' => 'dokken@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'dokken@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);
//        \App\Models\User::create([
//            'username' => 'collector',
//            'email' => 'collector@gmail.com',
//            'image' => asset('media/users/user.png'),
//            'pubkey' => '',
//            'idToken' => '',
//            'verifier_id' => 'collector@gmail.com',
//            'aggregate_verifier' => 'tkey-google-lrc',
//            'eoa' => '',
//            'safe' => ''
//        ]);

        // ARTISTS
        \App\Models\Artist::create([
            'name' => 'L Professor',
            'handle' => 'L_professor',
            'image' => asset('media/artists/L_Professor.jpeg'),
            'cover' => asset('media/artists/L_Professor_cover.jpeg'),
            'bio' => 'L Professor: Music Producer and Founder @ SuBass Studio (Greece)
Bass player @ INCO
A&R @Jungle Juice Records',
            'spotify_id' => '0yqgJJIjuNyBgzrSC9HbOp',
            'youtube_id' => '@LProfessorSuBassStudio',
            'instagram' => 'lprofessor',
            'twitter' => 'L_ProfessorGR'
        ]);
        \App\Models\Artist::create([
            'name' => 'ITPDWIP',
            'handle' => 'ITPDWIP',
            'image' => asset('media/artists/ITPDWIP.jpg'),
            'cover' => asset('media/artists/ITPDWIP_cover.jpg'),
            'bio' => 'Artist bio...',
            'spotify_id' => '4RTe3KTTeWj9bHtZ7dgJeN',
            'youtube_id' => '',
            'instagram' => '',
            'twitter' => ''
        ]);
        \App\Models\Artist::create([
            'name' => 'Negros Tou Moria',
            'handle' => 'blackmorris',
            'image' => asset('media/artists/NTM.jpeg'),
            'cover' => asset('media/artists/NTM-cover.jpeg'),
            'bio' => 'Black Morris is the approximate translation of Negros Tou Moria which in its original Greek is an adroit play on words with Geros Tou Moria, a legendary general of the Greek revolution against the Turkish occupation – this twist on a symbol of classic ‘Greekness’ goes a great way to describing the artist’s ethos, creativity and cultural dichotomy;he is an artist that embodies 21st century inner city Athens, speaking of and to its affronted youth with his own tenacious swagger. NTM or ‘Black Morris’ is best described as one of the most up and coming Greek rappers to have emerged in recent years, with unparalleled flow, prodigious beats and music that takes its cues from Europe and the US in equal measure, backed by a modern melting pot of intensely talented young producers and artists from a diversity of ethnic backgrounds. Born by Ghanaian parents in the economically depressed Athenian district of Ambelokipi, and growing up in and around the neglected Kipseli neighbourhood ‘Black Morris’ made his first tentative steps in the world of Greek rap next to the legendary MC TakiTsan and has since gone on to flesh out his unique and intuitive voice amongst the new-breed in his hometown.',
            'spotify_id' => '0kw0RBxQ5PjqTePr8TrTI1',
            'youtube_id' => '@blackmorris37',
            'instagram' => 'blackmorris37',
            'twitter' => 'negrostoumoria1'
        ]);
        \App\Models\Artist::create([
            'name' => 'Nerom',
            'handle' => 'nerom',
            'image' => asset('media/artists/nerom.jpg'),
            'cover' => asset('media/artists/Nerom-cover.jpeg'),
            'bio' => 'Henry Moren, known as Nerom, is a music producer, songwriter and Art Director who comes from Greece. He was born the 13th of September 1994 in Maroussi, Attiki. At an early age he gets engaged with arts like painting and music, taking part in music bands as a drummer. In 2010 he decides to follow his own music journey in the Rap music scene. He works with Rap artists like Long3, Ν.Ο.Ε., FOVIES, Pepe Frantik, Tiny Jackal, ΔΠΘ, initially as a music producer. In 2012 he graduates from senior high school and starts recording his first solo singles as an MC, which create his first mixtape called ‘PEISMA’. In 2019 ‘Donut’ comes out .It is an album which is a landmark ,and its logo, the donut, has been his trademark since that releasing In the album there are two participations and nine songs in total. There we meet Pepe Frantik (Above the Hood) in ‘FLY’ and Sapranov (Above the hood) in Burger King. The music production was done by his fellow artists M.O NOMAD, Smuggler, Zemo, Gverse, Madking and Nerom himself. In January 2020 he releases his single ‘Dwstou’ in cooperation with Long 3,Stikos &Dj cron exclusively in Spotify. In July 2020 his single ‘Teleftaia Goulia‘ comes out in cooperation with Stk.',
            'spotify_id' => '3lGQm71mSfPq4pSFpQg0ht',
            'youtube_id' => '@Nerom',
            'instagram' => null,
            'twitter' => null
        ]);

        // ARTIST EXTRAS

        \App\Models\ArtistExtras::create([
            'youtube_subs' => null,
            'spotify_monthly_listeners' => 62500,
            'insta_followers' => null,
            'date' => Carbon::createFromDate(2023,10,1),
            'artist_id' => 1,
        ]);
        \App\Models\ArtistExtras::create([
            'youtube_subs' => null,
            'spotify_monthly_listeners' => null,
            'insta_followers' => null,
            'date' => Carbon::createFromDate(2023,10,1),
            'artist_id' => 2,
        ]);
        \App\Models\ArtistExtras::create([
            'youtube_subs' => 41500,
            'spotify_monthly_listeners' => 145000,
            'insta_followers' => 56300,
            'date' => Carbon::createFromDate(2023,10,1),
            'artist_id' => 3,
        ]);
        \App\Models\ArtistExtras::create([
            'youtube_subs' => 2200,
            'spotify_monthly_listeners' => 3070,
            'insta_followers' => null,
            'date' => Carbon::createFromDate(2023,10,1),
            'artist_id' => 4,
        ]);

        // TRACKS
        \App\Models\Track::create([
            'name' => 'Special',
            'about' => 'L Professor: Music Producer and Founder @ SuBass Studio (Greece)
Bass player @ INCO
A&R @Jungle Juice Records

Gio Melody:
Spotify Monthly Listeners: 62.500
Certified Platinum and Gold Singles.
Artist of Capital Music Greece.
',
            'image' => asset('media/tracks/Special.jpg'),
            'cover' => asset('media/artists/Gio Melody Cover.jpeg'),
            'isrc' => 'ushm82181401',
            'spotify_id' => '4hJThuPp1QkjvpW83nJFHF',
            'youtube_id' => '',
            'sample_url' => asset('media/tracks/Special ft. Gio Melody - TEASER .mp3'),
            'artist_id' => 1,
            'released_at' => '2021-08-01'
        ]);
        \App\Models\Track::create([
            'name' => 'Blinded By The Light',
            'about' => '',
            'image' => asset('media/tracks/blinded_by_the_light.jpg'),
            'cover' => asset('media/tracks/blinded_by_the_light_cover.jpg'),
            'isrc' => '-',
            'spotify_id' => '7zc0x7i8eouXg3ITulLbRr',
            'youtube_id' => '',
            'sample_url' => asset('media/sample.mp3'),
            'artist_id' => 2,
            'released_at' => '2019-11-22'
        ]);
        \App\Models\Track::create([
            'name' => 'Μ.Π.Ε.Σ.Α ΙΙΙ',
            'about' => '',
            'image' => asset('media/tracks/MPESAIII.png'),
            'cover' => asset('media/artists/NTM-cover.jpeg'),
            'isrc' => 'QZB4J1856319',
            'spotify_id' => '7JztKGyQzL61eQXv0zGsEL',
            'youtube_id' => 'cKoroGQq_2o',
            'sample_url' => asset('media/tracks/MPESAIII_teaser.mp3'),
            'artist_id' => 3,
            'released_at' => '2016-08-15'
        ]);
        \App\Models\Track::create([
            'name' => 'No Stress',
            'about' => '',
            'image' => asset('media/tracks/No Stress.png'),
            'cover' => asset('media/tracks/No Stress Cover.jpeg'),
            'isrc' => 'GRSTY2202183',
            'spotify_id' => '2I5eu7ILTn1PUW9Kp6cq5G',
            'youtube_id' => '',
            'sample_url' => asset('media/tracks/No Stress - Nerom X L Professor  (Teaser).mp3'),
            'artist_id' => 4,
            'released_at' => '2022-06-22'
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
            'legal_url' => asset('dripit PoC Purchase Agreement.pdf'),
            'sold_out' => 1,
            'published' => 1,
            'track_id' => 1,
        ]);
        \App\Models\Drop::create([
            'contract' => '0x456456456',
            'slug' => 'blinded-by-the-light',
            'price' => 1000,
            'royalties_share' => 25,
            'extras' => ['first_dibs' => true, 'virtual_event' => false],
            'starts_at' => '2023-09-30',
            'ends_at' => '2023-10-10',
            'supply' => 100,
            'minted' => 0,
            'legal_url' => asset('dripit PoC Purchase Agreement.pdf'),
            'sold_out' => 0,
            'published' => 1,
            'track_id' => 2,
        ]);
        \App\Models\Drop::create([
            'contract' => '0x3333',
            'slug' => 'mpesaIII',
            'price' => 1000,
            'royalties_share' => 25,
            'extras' => ['first_dibs' => true, 'virtual_event' => false],
            'starts_at' => '2023-10-20',
            'ends_at' => '2023-10-28',
            'supply' => 100,
            'minted' => 0,
            'legal_url' => asset('dripit PoC Purchase Agreement.pdf'),
            'sold_out' => 0,
            'published' => 1,
            'track_id' => 3,
        ]);
        \App\Models\Drop::create([
            'contract' => '0x88888',
            'slug' => 'no-stress',
            'price' => 1000,
            'royalties_share' => 25,
            'extras' => ['first_dibs' => true, 'virtual_event' => false],
            'starts_at' => '2023-10-22',
            'ends_at' => '2023-10-31',
            'supply' => 100,
            'minted' => 0,
            'legal_url' => asset('dripit PoC Purchase Agreement.pdf'),
            'sold_out' => 0,
            'published' => 1,
            'track_id' => 4,
        ]);

        // NFTs
//        for($i=1;$i<=100;$i++){
//            $user = rand(1,8);
//            $date = Carbon::createFromDate('2023-09-01')->addDays(rand(0,9))->addSeconds(rand(0,86400));
//            \App\Models\NFT::create([
//                'token_id' => $i,
//                'image' => asset('media/tracks/Special.jpg'),
//                'minted_at' => $date,
//                'drop_id' => 1,
//                'minted_by' => $user,
//                'owner_id' => $user,
//            ]);
//            Transaction::create([
//                'hash' => '0x123',
//                'type' => 'mint',
//                'date' => $date,
//                'value_usd' => null,
//                'user_id' => $user,
//                'nft_id' => $i,
//                'royalty_round_id' => null,
//            ]);
//        }

        // ROYALTIES
        RoyaltyRound::create([
            'royalty_round_id' => 0,
            'amount' => 20000,
            'period_start' => '2023-09-01',
            'period_end' => '2023-10-01',
            'drop_id' => 1,
        ]);

        // TRANSACTIONS

    }
}
