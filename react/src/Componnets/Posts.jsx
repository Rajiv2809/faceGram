import React, { useContext, useEffect, useState } from 'react'
import { useStateContext } from '../Contexts/Context'
import axiosClient from '../Axios';

export default function Posts() {
    const { posts, setPosts } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/posts').then(({ data }) => {
            setPosts(data.posts);
        
            setLoading(false); 
        }).catch((err) => {
            console.log(err);
            setLoading(false); 
        })
    }, [    ]); 

    const daysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - postDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }


    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                posts && posts.length > 0 ? (
                    posts.map(post => (
                        <div className="card mb-4" key={post.post_id}>
                            <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                <h6 className="mb-0">{post.user.username}</h6>
                                <small className="text-muted">{daysAgo(post.created_at)} days ago</small>
                            </div>
                            <div className="card-body">
                                <div className="card-images mb-2">
                                    {post.post_attachment.map(postimg => (
                                        <img  src={`http://127.0.0.1:8000/storage/${postimg.storage_path}`} alt="image" className="w-100" key={postimg.id} />
                                    ))}
                                </div>
                                <p className="mb-0 text-muted"><b><a href={`/user/${post.user.username}`}>{post.user.username}</a></b> {post.caption}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )
            )}
        </>
    )
}
