<?php

namespace App\Trait;


trait ResponseHttpStatus  {

    protected function success($message) {
        return response()->json($message, 200);
    }
    protected function createSuccess($message){
        return response()->json($message,201 );
    }
}