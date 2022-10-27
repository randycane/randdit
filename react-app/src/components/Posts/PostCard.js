import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { deletePostThunk, ReadPostBySubrandditIdThunk } from "../../store/post";
import { getSubFromIdThunk } from "../../store/subranddit";


const PostCardComponent = ({ post }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { postId } = useParams();

    //need to confirm user to have post editdeletes:
    const session = useSelector((state) => state.session)
    let postWriter = post?.userId === session.user.id

    dispatch(ReadPostBySubrandditIdThunk(subrandditId))

    const deleteButton = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(postId))
        await dispatch(getSubFromIdThunk(subrandditId))
        await dispatch(ReadPostBySubrandditIdThunk(subrandditId))
    }

    useEffect(() => {
        dispatch(getSubFromIdThunk(subrandditId))
    }, [dispatch])

    return (
        <div className="post-top">
            <div className="post-title">
                {post.post_title}
            </div>
            <div className="post-img">
                <img src={post.image_url} alt="nah"/>
            </div>
            <div className="post-words">
                {post.post_text}
            </div>
            <div className="logic">
                {postWriter && (
                    <>
                        <button className="click" onClick={(e) => deleteButton(e)}>

                        </button>
                        </>
                )}
            </div>
        </div>


    )
}

export default PostCardComponent;
