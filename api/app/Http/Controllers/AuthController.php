<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\loginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\registerRequest;
use Illuminate\Contracts\Support\ValidatedData;

class AuthController extends Controller
{
    public function  register(registerRequest $request){
        $user = User::Create([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'bio' => $request->bio,
            'password' => bcrypt($request->password),
            'is_private' => $request->is_private
        ]);

        return response()->json([
            'message' => 'register success',
            'token' => $user->createToken($request->username)->plainTextToken,
            'user' => $user
        ],201); 


    }
    public function  login(loginRequest $request){
        $data = [
            'username'=>$request->username,
            'password'=>$request->password
        ];

        if(!Auth::attempt($data)){
            return response()->json([
                "message" =>  "Wrong username or password"
            ],401);
        };
        $user = User::where('username','=',$request->username) ->first();

        return response()->json([
            'message' => 'Login Success',
            'token' => 'Bearer '. $user->createToken($user->username)->plainTextToken,
            'user' => $user
        ],200);

    }
    public function logout(Request $request){
       
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout Success',
            
        ],200);
    }
}
