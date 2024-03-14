<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Follow extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable=['user_id', 'follower_id', 'following_id', 'is_accepted'];
    public function user(): HasMany
    {
       return $this->hasMany(User::class);
    }

}
