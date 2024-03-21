<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function followUser($username){
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
            $status = $existingFollow->is_accepted ? 'following' : 'requested';
            return response()->json([
                'message' => 'You are already followed',
                'status' => $status
            ], 422);
        }
        $status = 'requested';
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
    public function unfollow($username){
        $userToUnfollow = User::where('username', $username)->first(); 

        if(!$userToUnfollow){
            return response()->json([
                'message' => 'User not found'
        ], 404);
        };
        $existingUnfollow = Follow::where([
            'follower_id' => Auth::id(),
            'following_id' => $userToUnfollow->id,
        ])->first();
        if(!$existingUnfollow){
            return response()->json([
                'message' => 'You are not following the user'
            ], 422);
        }
        $existingUnfollow->delete();
        
        return response()->json(null, 204);
    }
    public function allFollowing($username) {
        $user = User::where('username', $username)->first();
    
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $following = Follow::where('follower_id', $user->id)->pluck('following_id');
        
    
        $allFollowing = User::whereIn('id', $following)->get();
    
        return response()->json([
            'following' => $allFollowing
        ], 200);
    }
    public function follback($username){
            $user = User::where('username', $username)->first();
            if(!$user){
                return response()->json([
                    'message' => "User not found"
                ],422);
            } 

            $follback = Follow::where([
                'follower_id' => $user->id,
                'following_id'=>Auth::id(),
                
            ])->first();
            if(!$follback){
                return response()->json([
                    'message' => "The user is not following you"
                ],422);
            } 

            $accepted = $follback->is_accepted ;
            if($accepted == 1){
                
                return response()->json( [
                    'message' => "Follow request is already accepted"
                ], 422);
            }
            
            $follback->update(['is_accepted' => 1]);
            



            return response()->json([
                'message' => "Follow request accepted"
            ], 200);
        


    }
    public function allFollowers($username) {
        $user = User::where('username', $username)->first();
    
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
    
        $followers = Follow::where('following_id', $user->id)->select('follower_id', 'is_accepted')->get();
    
        $followerData = $followers->map(function ($follower) {
            $followerUser = User::find($follower->follower_id);
            return [
                'id' => $followerUser->id,
                'full_name' => $followerUser->full_name,
                'username' => $followerUser->username,
                'bio' => $followerUser->bio,
                'is_private' => $followerUser->is_private,
                'created_at' => $followerUser->created_at,
                'is_requested' => $follower->is_accepted
            ];
        });
    
        return response()->json([
            'followers' => $followerData
        ], 200);
    }

    public function allRequests()
    {
        $user = Auth::user();
        
        $requests = Follow::where('following_id', $user->id)->get();
        
        $requestsData = [];
        foreach ($requests as $request) {
            $followerId = $request->follower_id;
            $followerUsername = User::where('id', $followerId)->value('username');
            $requestInfo = [
                'id' => $request->id,
                'follower_id' => $request->follower_id,
                'following_id' => $request->following_id,
                'username' => $followerUsername, 
                'is_accepted' => $request->is_accepted,
                'created_at' => $request->created_at,
            ];
            $requestsData[] = $requestInfo;
        }
        
        return response()->json([
            'followers' => $requestsData
        ], 200);
    }
    


}   
