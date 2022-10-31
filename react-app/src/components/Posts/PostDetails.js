import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { ReadPostsThunk } from "../../store/post";
import PostCardComponent from "./PostCard";

function SeeThePostsComponent() {
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state)

    useEffect(() => {
        dispatch(ReadPostsThunk())
    }, [dispatch])

    return (
        <>
            <h2 id="post-head">Posts</h2>
            <div className="post-outside-container">
                <div className="post-inner-container">
                    <PostCardComponent/>
                </div>
            </div>
            </>
    )
}

export default SeeThePostsComponent;
