import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { ReadPostsThunk, ReadPostBySubrandditIdThunk } from "../../store/post";
import PostCardComponent from "./PostCard";
import PostFormComponent from "./PostForm";
import UpdatePostComponent from "./EditPost";
import { getSubFromIdThunk } from "../../store/subranddit";

import "./Posts.css"

function SeeThePostsComponent() {
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.posts)
    const normalizedPosts = Object.values(allPosts)

    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);
    // console.log("type of", typeof subrandditId)

    // console.log("state for post", allPosts)

    // console.log("should be normalized", normalizedPosts)


    useEffect(() => {
        dispatch(getSubFromIdThunk(subrandditId))
        dispatch(ReadPostBySubrandditIdThunk(subrandditId))
    }, [dispatch, subrandditId])

    return (
        <>
            <h2 id="post-head">Posts</h2>
            <div className="post-outside-container">
                <div className="post-inner-container">

                    <div className="hi-man">
                    <PostFormComponent />
                    </div>

                    <div className="map">
                        {normalizedPosts.map((post) => {
                            return (
                                <div key={post.id} className="details">
                                    <div className="in-detail"> Author ID: {post.author_id}</div>
                                    <div className="in-detail"> Title: {post.post_title}</div>
                                    <div className="in-detail"> Text: {post.post_text}</div>
                                    <img src={post.image_url} alt="no" className="img" ></img>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            </>
    )
}

export default SeeThePostsComponent;
