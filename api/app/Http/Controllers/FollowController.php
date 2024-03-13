<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function followUser($username)
    {
        $userToFollow = User::where('username', $username)->first();

        
        if (!$userToFollow) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

    
        if ($userToFollow->id == Auth::id()) {
            return response()->json([
                'message' => 'You are not allowed to follow yourself'
            ], 422);
        }

        
        $existingFollow = Follow::where([
            'follower_id' => Auth::id(),
            'following_id' => $userToFollow->id,
        ])->first();

        if ($existingFollow) {
            $status = $existingFollow->is_accepted ? 'requested' : 'following';
            return response()->json([
                'message' => 'You are already followed',
                'status' => $status
            ], 422);
        }

       
        $status = $existingFollow->is_accepted === null ? 'requested' : 'following';

        $follow = new Follow([
            'follower_id' => Auth::id(),
            'following_id' => $userToFollow->id,
            'is_accepted' => $status === 'following' ? 1 : 0,
            'created_at' => now(),
        ]);

        $follow->save();

        return response()->json([
            'message' => 'Follow success',
            "status" =>  $status
        ], 200);
    }
}
