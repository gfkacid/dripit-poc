<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drop extends Model
{
    use HasFactory;

    public function track()
    {
        return $this->belongsTo(Track::class);
    }
    public function owners()
    {
        return $this->hasManyThrough(User::class, NFT::class, 'drop_id', 'id', 'id', 'owner_id');
    }

    public function collectors(){
        return $this->owners()->select('users.username','users.image',\DB::raw('COUNT(*) as tokens'))->groupBy(['users.username','users.image','nfts.drop_id'])->orderByDesc('tokens')->orderBy('users.username');
    }

    protected $hidden = [
        'laravel_through_key'
    ];

//    protected $casts = [
//        'extras' => 'array',
//    ];

//    protected function extras(): Attribute
//    {
//        return Attribute::make(
//            get: fn ($value) => json_decode($value, true),
//            set: fn ($value) => json_encode($value),
//        );
//    }
}
