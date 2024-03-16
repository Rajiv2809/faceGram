import React, { useEffect, useState, } from 'react'
import { useStateContext } from '../Contexts/Context'
import axiosClient from '../Axios';
import { useParams } from 'react-router-dom';

export default function User() {
    const { currentUser, } = useStateContext();
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
                <a href="/create/post" class="btn btn-primary w-100 mb-2">
                    {user.is_your_account && ('Create post')}
                </a>
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
            {!loading && posts.length && posts.map(p => (
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="card-images mb-2">
                            {p.post_attachment.map(img => (
                                <img  src={`http://127.0.0.1:8000/storage/${img.storage_path}`} alt="image" class="w-100"/>
                            ))}
                           
                        </div>
                        <p class="mb-0 text-muted">{p.caption}</p>
                    </div>
                </div>
            </div>
            ))}

        </div>
    </div>
</main>
  )
}
