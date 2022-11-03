import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory, useParams } from "react-router";
import { ReadPostsThunk, ReadPostBySubrandditIdThunk, deletePostThunk } from "../../store/post";
import PostCardComponent from "./PostCard";
import PostFormComponent from "./PostForm";
import UpdatePostComponent from "./EditPost";
import { getSubFromIdThunk } from "../../store/subranddit";

import "./Posts.css"

function SeeThePostsComponent({post}) {
    const dispatch = useDispatch();
    const history = useHistory();
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

    let deleteButton = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(post.id))


        history.push(`/subranddits/${subrandditId}`)
    }

    // delete post button:
    // const deleteThisPostRn = async (postId) => {
    //     await dispatch(deletePostThunk(postId)).then(() => {
    //         history.push('/');
    //     })
    // }

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
                                <div className="out">
                                    <Link to={`/subranddits/${subrandditId}/posts/${post.id}`}>
                                <div key={post.id} className="details">
                                    <div className="in-detail"> Author ID: {post.author_id}</div>
                                    <div className="in-detail"> Title: {post.post_title}</div>
                                    <div className="in-detail"> Text: {post.post_text}</div>
                                    <img src={post.image_url} alt="no" className="img" ></img>
                                    </div>
                                    <div className="button">
                                    <button>Delete your post{(e) => deleteButton(e)}</button>
                                    </div>
                                    </Link>
                                    {/* <div className="undercard">
                                        <button
                                            className="delete-button"
                                                onClick={() =>
                                            deleteThisPostRn(post.id)
                                             }>
                                                Delete Post
                                        </button>
                                        </div> */}
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
