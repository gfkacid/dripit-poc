<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtistExtras extends Model
{
    use HasFactory;

    public $table = 'artist_extras';

    public function artist()
    {
        return $this->belongsTo(Artist::class,'artist_id');
    }

}
