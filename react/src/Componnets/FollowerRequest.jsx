import React, { useEffect, useState } from 'react';
import axiosClient from '../Axios';
import { useStateContext } from '../Contexts/Context';

export default function FollowerRequest({ username }) {
    const [followerRequest, setFollowerRequest] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();

    useEffect(() => {
        axiosClient.get(`/users/${username}/followers`).then(({ data }) => {
            const newRequest = data.followers.filter(user => user.is_requested === 0)
            setFollowerRequest(newRequest);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const confirmHandler = (username) => {
        axiosClient.put(`/users/${username}/accept`).then(({ data }) => {
            showToast(data.message);
            setFollowerRequest(prevRequests => prevRequests.filter(req => req.username !== username));
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className="request-follow mb-4">
                <h6 className="mb-3">Follow Requests</h6>
                <div className="request-follow-list">
                    {!loading && followerRequest.length > 0 && followerRequest.map(req => (
                        <div key={req.id} className="card mb-2">
                            <div className="card-body d-flex align-items-center justify-content-between p-2">
                                <a href={`/user/${req.username}`}>{req.username}</a>
                                <button onClick={() => confirmHandler(req.username)} className="btn btn-primary btn-sm">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    ))}
                    {followerRequest.length === 0 && (
                        <h5>Nothing to accept</h5>
                    )}
                </div>
            </div>
        </>
    );
}
