import React, { useEffect, useState } from 'react'
import axiosClient from '../Axios';

    export default function FollowerRequest({username}) {
    const [followerRequest, setFollowerRequest] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        axiosClient.get(`/users/${username}/followers`).then(({data}) => {
            const newRequest = data.filter(user => user.is_accepted === 0 )
            setFollowerRequest(newRequest);
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    },[])

    return (
    <>
        <div class="request-follow mb-4">
                    <h6 class="mb-3">Follow Requests</h6>
                    <div class="request-follow-list">
                    {!loading && followerRequest.length > 0 && followerRequest.map( req => (

                        <div key={req.id} class="card mb-2">
                            <div class="card-body d-flex align-items-center justify-content-between p-2">
                                <a href="user-profile-private.html">{req.username}</a>
                                <a href="" class="btn btn-primary btn-sm">
                                    Confirm 
                                </a>
                            </div>
                        </div>
                    ))}
                    {followerRequest.length == 0 && (
                        <h5>Nothing to accept</h5>
                    )}
                    </div>
                </div>
    
    
    
    </>
  )
}
