<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Follow;
use App\Models\Post_attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public  function allUser(){
         $loggedInUserId = Auth::id();

        
        $userNotFollow = User::whereNotIn('id', function ($query) use ($loggedInUserId) {
            $query->select('following_id')
                  ->from('follows')
                  ->where('follower_id', $loggedInUserId);
        })->where('id', '!=', $loggedInUserId) ->get();

        return response()->json([
            'users' => $userNotFollow
        ]);
    }
    public function getUser($username) {
        $loggedInUserId = Auth::id();
        $user = User::where('username', $username)->first();
        
        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ]);
        }

        if(!$user){
            return response()->json([
                "message" => "No user found!"
            ], 404);
        }   
        
        $followingStatus = 'not-following';
        
        if($loggedInUserId != $user->id){
            $isFollowing = Follow::where([
                'follower_id' => $loggedInUserId,
                'following_id' => $user->id
                ])->first();
                
                if($isFollowing !== null){
                    if($isFollowing->is_accepted == 1){
                        $followingStatus = 'following';
                    } elseif ($isFollowing->is_accepted == 0) {
                        $followingStatus = 'requested';
                    }
                }
            }
            
        $posts = Post::with('post_attachment')->where('user_id', $user->id)->get();
        $followers = Follow::where('following_id', $user->id)->count();
        $following = Follow::where('follower_id' , $user->id)->count();
       
        
        
        $user->is_your_account = Auth::id() ===  $user->id ? true : false ;
        $user->following_status = $followingStatus;
        $user->posts_count = $posts->count();
        $user->followers_count = $followers; 
        $user->following = $following;
        $user->posts = $posts;
         

    
        return response()->json($user,200);
    }
    public function me(){
        $user = User::find(Auth::id());
        return response()->json(
            $user
        );
    }
}

