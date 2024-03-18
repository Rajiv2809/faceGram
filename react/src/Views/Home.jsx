import React, { useEffect } from "react";
import { useStateContext } from "../Contexts/Context";
import axiosClient from "../Axios";
import Posts from "../Componnets/Posts";
import FollowerRequest from "../Componnets/FollowerRequest";
import ExplorePeople from "../Componnets/ExplorePeople";

export default function Home() {
  const { currentUser, setCurrentUser, setToken, showToast } = useStateContext();

 
  useEffect(() => {
    axiosClient.get('/me').then(({data}) => {
        setCurrentUser(data);
    }).catch((err) => {
        console.log(err)
    })
}, [])
  return (
    <>
      

     <main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-between">
            <div class="col-md-8">
                <h5 class="mb-3">News Feed</h5> 
                <Posts />
            </div>
            <div class="col-md-4">
            {currentUser && currentUser.username && (
                <FollowerRequest username={currentUser.username} />
              )}
              <ExplorePeople/>
            </div>
        </div>
    </div>
    </main>
    </>
  );
}
