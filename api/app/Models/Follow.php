<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable=['user_id', 'follower_id', 'following_id', 'is_accepted'];
    public function user(){
        $this->hasMany(User::class);
    }

}
