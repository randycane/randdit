import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect, useParams} from "react-router-dom"
import { deletePostThunk, EditPostThunk } from "../../store/post";

import "./Posts.css"

function UpdatePostComponent() {

    const dispatch = useDispatch();
    const history = useHistory();

    let { subrandditId } = useParams();
    let { postId } = useParams();
    subrandditId = Number(subrandditId);
    postId = Number(postId);

    const selectedPost = useSelector(state => state?.posts[postId])


    // console.log("this post print", selectedPost)

    const [post_title, setPost_title] = useState(selectedPost?.post_title)
    const [post_text, setPost_text] = useState(selectedPost?.post_text)
    const [image_url, setImage_url] = useState(selectedPost?.image_url)
    const [isUpdated, setIsUpdated] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errorArray = []
        if (!post_title) errorArray.push("Title is required.")
        if (!post_text) errorArray.push("Your post needs words.")

        setErrors(errorArray)
    }, [post_title], [post_text], [image_url])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUpdated(true);
        if (errors.length > 0) return;

        let editPost = dispatch(EditPostThunk({
            post_title,
            post_text,
            image_url
        }, postId))

        if (editPost) {
            history.push(`/subranddits/${subrandditId}`)
        }
    }

    // delete post button:
    const deleteThisPostRn = async (postId) => {
        await dispatch(deletePostThunk(postId)).then(() => {
            history.push('/');
        })
    }

    const showErrors = errors.map((error) => (
        <div className="error-messages" key={error}>
            {error}
        </div>
    ));

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
        <div className="editted-container">
            <ul className="messages">{isUpdated && showErrors}</ul>
            <div className="under-editted">
                    <div className="form-title">
                        <span> Edit your Post: </span>
            </div>
                    <div className="edit-input-container">
                        <span> Title: </span>
                        <label>
                            <textarea
                                type="text"
                                placeholder="title"
                                value={post_title}
                                onChange={(e) => setPost_title(e.target.value)}
                            />
                        </label>
                        <span> Text: </span>
                        <label>
                            <textarea
                                type="text"
                                placeholder="description"
                                value={post_text}
                                onChange={(e) => setPost_text(e.target.value)}
                            />
                        </label>
                        <span> Image URL: </span>
                        <label>
                            <textarea
                                type="text"
                                placeholder="image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}
                            />
                        </label>
                    </div>
        </div>
        <div className="to-press">
                <button onClick={handleSubmit} className="submit-button"
                    type="submit"
                    className="submit-button"
                    >
                    Edit your Post
                </button>
                </div>
                {/* delete nested in editing */}
                <div className="undercard">
            <button
            className="delete-button"
            onClick={() =>
                deleteThisPostRn(postId)
                }>
                Delete Post
            </button>
            </div>
        </div>
        </form>
    )


}


export default UpdatePostComponent;
