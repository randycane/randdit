import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { deletePostThunk, ReadPostBySubrandditIdThunk } from "../../store/post";
import { getSubFromIdThunk } from "../../store/subranddit";


const PostCardComponent = ({ post }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { postId } = useParams();
    const { subrandditId } = useParams();
    console.log("type of", typeof subrandditId)

    //need to confirm user to have post editdeletes:
    const session = useSelector((state) => state.session.user)
    // let postWriter = post?.userId === session.user.id



    const deleteButton = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(postId))
        // await dispatch(getSubFromIdThunk(subrandditId))
        // await dispatch(ReadPostBySubrandditIdThunk(subrandditId))
    }

    useEffect(() => {
        dispatch(ReadPostBySubrandditIdThunk(subrandditId))
    }, [dispatch])

    return (
        <div className="post-top">
            <div className="post-title">
                {post.post_title}
            </div>
            <div className="post-img">
                <img src={post.image_url} alt="not found"/>
            </div>
            <div className="post-words">
                {post.post_text}
            </div>
            <div className="logic">

                    <>
                        <button className="click" onClick={(e) => deleteButton(e)}>

                        </button>
                        </>

            </div>
        </div>


    )
}

export default PostCardComponent
