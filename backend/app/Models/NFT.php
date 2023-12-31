<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NFT extends Model
{
    use HasFactory;
    protected $table = 'nfts';

    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        'token_id',
        'image',
        'minted_at',
        'drop_id',
        'minted_by',
        'owner_id',
    ];

    public function drop()
    {
        return $this->belongsTo(Drop::class);
    }

    public function minter()
    {
        return $this->hasOne(User::class,'minted_by');
    }

    public function owner(){
        return $this->hasOne(User::class,'owner_by');
    }
}
