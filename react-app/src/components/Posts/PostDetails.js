import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory, useParams } from "react-router";
import { ReadPostsThunk, ReadPostBySubrandditIdThunk, deletePostThunk } from "../../store/post";
import PostCardComponent from "./PostCard";
import PostFormComponent from "./PostForm";
import UpdatePostComponent from "./EditPost";
import { getSubFromIdThunk } from "../../store/subranddit";
import DeletingPostModal from "./PostModal/DeletePostModal";
import UpdatingPostComp from "./PostModal/UpdateModal/UpdatePost";
import UpdatingPostModal from "./PostModal/UpdateModal";

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


        // history.push(`/subranddits/${subrandditId}`)
    }

    // delete post button:
    // const deleteThisPostRn = async (postId) => {
    //     await dispatch(deletePostThunk(postId)).then(() => {
    //         history.push('/');
    //     })
    // }

    return (
        <>
            <div className="post-outside-container">
                <div className="post-inner-container">

                    <div className="hi-man">
                    <PostFormComponent />
                    </div>
                    <div className="head">
                        View these posts!
                    </div>
                    <div className="map">
                        {normalizedPosts.map((post) => {
                            return (
                                <div className="out">
                                    <Link to={`/subranddits/${subrandditId}/posts/${post.id}`}>
                                <div key={post.id} className="details">
                                    <div className="in-detail"> Author: {post.author_id}</div>
                                    <div className="in-detail"> Title: {post.post_title}</div>
                                    <div className="in-detail"> Discussion: {post.post_text}</div>
                                    <img src={post.image_url} alt="n/a" onError={(e) => {
                                        e.currentTarget.src = "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg"
                                        }}  className="img" ></img>
                                    </div>
                                    <div className="button">

                                    </div>
                                    </Link>
                                    <div className="middlecard">
                                        <UpdatingPostModal post={post}/>
                                        </div>
                                    <div className="undercard">
                                        <DeletingPostModal post={post}/>
                                        </div>

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
