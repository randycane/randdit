import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { deletePostThunk, ReadPostBySubrandditIdThunk, SeePostByItsPostIdThunk } from "../../store/post";
import { getSubFromIdThunk } from "../../store/subranddit";
import UpdatePostComponent from "./EditPost";
import DeletingPostModal from "./PostModal/DeletePostModal/DeletePost";

const PostCardComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { postId } = useParams();
    //console.log("my posy", postId)
    const { subrandditId } = useParams();
    // console.log("type of", typeof subrandditId)
    // const params = useParams();
    // console.log("what", params)

    const post = useSelector((state)=> state.posts)

    //need to confirm user to have post editdeletes:
    const session = useSelector((state) => state.session.user)
    let postWriter = post?.userId === session?.user?.id



    const deleteButton = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(postId))
        // await dispatch(getSubFromIdThunk(subrandditId))
        // await dispatch(ReadPostBySubrandditIdThunk(subrandditId))
        history.push(`/subranddits/${subrandditId}`)
    }

    useEffect(() => {
        // dispatch(ReadPostBySubrandditIdThunk(subrandditId))
        dispatch(SeePostByItsPostIdThunk(subrandditId, postId))
    }, [dispatch])

    return (
        <div className="post-top">
            <div className="post-title">
                {post?.post_title}
            </div>
            <div className="post-img">
                <img src={post?.image_url} alt="not found"/>
            </div>
            <div className="post-words">
                {post?.post_text}
            </div>
            {/* <div className="undercard">
          <DeletingPostModal post={post}/>
            </div> */}
            <>
                {/* {postWriter && (
                    <div className="logic">
                        <>
                            <UpdatePostComponent/>
                            <button className="click" onClick={(e) => deleteButton(e)}>
                            </button>
                        </>
                    </div>
                )} */}
                </>
        </div>
    )
}

export default PostCardComponent
