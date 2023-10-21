<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoyaltyRound extends Model
{
    use HasFactory;
    public $table = 'royalty_rounds';

    public function drop()
    {
        return $this->belongsTo(Drop::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
