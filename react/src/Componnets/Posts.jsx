import React, { useContext, useEffect, useState, useRef } from 'react';
import { useStateContext } from '../Contexts/Context';
import axiosClient from '../Axios';

export default function Posts() {
    const { posts, setPosts } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10); // Initial size is 10
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/posts?page=${page}&size=${size}`).then(({ data }) => {
            if (page === 0) {
                setPosts(data.posts);
            } else {
                setPosts(prevPosts => [...prevPosts, ...data.posts]);
            }
            setHasMore(data.posts.length > 0);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [page, size]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prevPage => prevPage + 1);
            
                setSize(7);
                setLoading(true);
            }
        }, { threshold: 1 });
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [hasMore, loading]);

    const daysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - postDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }

    return (
        <>
            {loading && !posts.length ? (
                <p>Loading...</p>
            ) : (
                posts && posts.length > 0 ? (
                    <>
                        {posts.map(post => (
                            <div className="card mb-4" key={post.post_id}>
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h6 className="mb-0">{post.user.username}</h6>
                                    <small className="text-muted">{daysAgo(post.created_at)} days ago</small>
                                </div>
                                <div className="card-body">
                                    <div className="card-images mb-2">
                                        {post.post_attachment.map(postimg => (
                                            <img src={`http://127.0.0.1:8000/storage/${postimg.storage_path}`} alt="image" className="w-100" key={postimg.id} />
                                        ))}
                                    </div>
                                    <p className="mb-0 text-muted"><b><a href={`/user/${post.user.username}`}>{post.user.username}</a></b> {post.caption}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={loader}></div>
                    </>
                ) : (
                    <p>No posts found.</p>
                )
            )}
        </>
    )
}