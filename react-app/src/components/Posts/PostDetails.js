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
import WritingPostModal from "./PostModal/WritingModal";

function SeeThePostsComponent({post}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPosts = useSelector((state) => state.posts)

    const normalizedPosts = Object.values(allPosts)

    console.log("show me all posts rn",allPosts)

    const reversedPosts = normalizedPosts.sort().reverse()

    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);


    const author = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getSubFromIdThunk(subrandditId))
        dispatch(ReadPostBySubrandditIdThunk(subrandditId))
    }, [dispatch, subrandditId])



    return (
        <>
            <div className="post-outside-container">
                <div className="post-inner-container">
                    {author && (
                    <div className="hi-man">
                    <WritingPostModal />
                    </div>
                    )}
                    <div className="head">
                        View these posts!
                    </div>
                    <div className="map">
                        {reversedPosts.map((post) => {
                            return (
                                <div className="out">

                                <div key={post} className="details">

                                    <div className="in-detail"> Title: {post?.post_title}</div>
                                    <div className="in-detail"> Discussion: {post?.post_text}</div>
                                    {post?.image_url && (
                                <div className="imgDivision">
                                    <img
                                        className="img"
                                        alt=""
                                        src={post?.image_url}
                                        onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src =
                                        "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg";
                                         }}
                                    ></img>
                                    </div>
                                    )}
                                    </div>
                                    <div className="button">
                                    </div>
                                    {author && author?.id === post?.author_id && (
                                        <div className="mikey">
                                    <div className="middlecard">
                                        <UpdatingPostModal post={post}/>
                                        </div>
                                    <div className="undercard">
                                        <DeletingPostModal post={post}/>
                                            </div>
                                            </div>
                                    )}
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
