<?php

namespace App\Traits;

trait ResponseHttpStatus{

    protected function success($message, $status= 200){

        return response()->json($message, $status);
    }

    protected function badRequest($message, $status = 400){
        return response()->json([
            "message" => $message,

        ], $status);
    }
    protected function createdSuccess($message, $status= 200){
        return response()->json($message, $status);
    }

    protected function unauthoticated($message, $status= 401){
        return response()->json([
            "message" => $message,

        ], $status);
    }
    protected function notFound($message, $status= 404){
        return response()->json([
            "message" => $message,

        ], $status);
    }
    protected function messageSuccess($message, $status= 200){
        return response()->json([
            "message"=> $message,
        ], $status);
    }
    
}
