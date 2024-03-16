import React, { useEffect } from "react";
import { useStateContext } from "../Contexts/Context";
import axiosClient from "../Axios";
import Posts from "../Componnets/Posts";

export default function Home() {
  const { currentUser, setToken, showToast } = useStateContext();

 

  return (
    <>
      

     <main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-between">
            <div class="col-md-8">
                <h5 class="mb-3">News Feed</h5> 
                <Posts />
            </div>
        </div>
    </div>
    </main>
    </>
  );
}
