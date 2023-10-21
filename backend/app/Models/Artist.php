<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

    public function extras()
    {
        return $this->hasMany(ArtistExtras::class,'artist_id');
    }

    public function latestExtras()
    {
        return $this->hasMany(ArtistExtras::class,'artist_id')->latest('date')->take(1);
    }

}
