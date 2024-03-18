import React, { useEffect, useState, } from 'react'
import { useStateContext } from '../Contexts/Context'
import axiosClient from '../Axios';
import { useParams } from 'react-router-dom';

export default function User() {
    const { currentUser, showToast } = useStateContext();
    const [user , setUser] = useState({});
    const [posts, setPosts] = useState([])
    const {username} = useParams(); 
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axiosClient.get(`/users/${username}`).then(({data}) => {
            setUser(data);
            setPosts(data.posts)
            console.log(data)
            setLoading(false)
        }).catch((err) => {
            console.log('Error:', err);
        })
    },[])

    const followHandler = (e) => {
        e.preventDefault();
        axiosClient.post(`/users/${user.username}/follow`).then(({data}) => {
            showToast(data.message)
            window.location.reload()
        }).catch((err) => {
            showToast(err.response.data.message)
        }) 
    }
    const UnfollowHandler = (e) => {
        e.preventDefault();
        axiosClient.delete(`/users/${user.username}/unfollow`).then(({data}) => {
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    
<main class="mt-5">
    <div class="container py-5">
        <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h5 class="mb-0">{user.full_name}</h5>
                    <span>@{user.username}</span>
                </div>
                <small class="mb-0 text-muted">
                    {user.bio}   
                </small>
            </div>
            <div>
            {user.is_your_account ? (
                    <a href="/create/post" className="btn btn-primary w-100 mb-2">
                        Create post
                    </a>
                ) : user.following_status === 'requested' ? (
                    <a href="" onClick={UnfollowHandler}  class="btn btn-secondary w-100 mb-2">Requested</a>
                ) : user.following_status === "not-following" ? (
                    <a href="" onClick={followHandler}  className="btn btn-primary w-100 mb-2">Follow</a>
                ) : user.following_status === 'following' ? (
                    <a href="" onClick={UnfollowHandler} class="btn btn-secondary w-100 mb-2" >Unfollow</a>
                ) : null}

                <div class="d-flex gap-3">
                    <div>
                        <div class="profile-label"><b>{user.posts_count}</b> posts</div>
                    </div>
                    <div class="profile-dropdown">
                        <div class="profile-label"><b>{user.followers_count}</b> followers</div>
                        <div class="profile-list">
                            <div class="card">
                                <div class="card-body"> 
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@davidnaista</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@superipey</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@lukicenturi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@_erik3010</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@asawgi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@irfnmaulaa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-dropdown">
                        <div class="profile-label"><b>{user.following}</b> following</div>
                        <div class="profile-list">
                            <div class="card">
                                <div class="card-body">
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@davidnaista</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@superipey</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@lukicenturi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@_erik3010</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@asawgi</a>
                                    </div>
                                    <div class="profile-user">
                                        <a href="user-profile-private.html">@irfnmaulaa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
        {!loading && (
            user.is_private ? (
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card py-4">
                            <div class="card-body text-center">
                                &#128274; This account is private
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                posts.length > 0 ? (
                    posts.map(p => (
                        <div class="col-md-4" key={p.id}>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="card-images mb-2">
                                        {p.post_attachment.map((img, index) => (
                                            <img src={`http://127.0.0.1:8000/storage/${img.storage_path}`} alt={`image-${index}`} class="w-100" key={index} />
                                        ))}
                                    </div>
                                    <p class="mb-0 text-muted">{p.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : null
            )
        )}



        </div>
    </div>
</main>
  )
}
