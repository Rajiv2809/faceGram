<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/v1')->group(function () {
    Route::prefix('/auth')->group(function () {
        
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    });
    
});

Route::prefix('/v1')->middleware('auth:sanctum')->group(function () {
    //posts
    Route::post('/posts', [PostController::class, 'store']); 
    Route::delete('/posts/{id}', [PostController::class, 'remove']);
    Route::get('/posts', [PostController::class, 'show']);
    //following
    Route::post('/users/{username}/follow', [FollowController::class, 'followUser']);
    Route::delete('/users/{username}/unfollow', [FollowController::class, 'unfollow']);
    Route::get('/users/{username}/following', [FollowController::class, 'allFollowing']);
    //follower
    Route::put('/users/{username}/accept', [FollowController::class, 'follback']);
    Route::get('/users/{username}/followers', [FollowController::class, 'allFollowers']);
    //get users
    Route::get('/users', [UserController::class, 'allUser']);
    Route::get('/users/{username}', [UserController::class , 'getUser']);
    Route::get('/me', [UserController::class, 'me']);
});