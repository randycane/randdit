import React, { useState, useEffect } from "react"
import { Modal } from "../../../Modals/modal"

import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"

import { EditPostThunk } from "../../../../store/post"

function UpdatingPostComp({ post, onClick }) {

    const dispatch = useDispatch()
    const history = useHistory()


    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);
    let { postId } = useParams();
    postId = Number(postId)

    const selectedPost = useSelector(state => state?.posts[post.id])
    console.log("show me the state", selectedPost)


    // const onEdd = () => {
    //     dispatch(EditPostThunk(post.id))

    //     history.push("/")
    // }

    const [post_title, setPost_title] = useState(selectedPost?.post_title)
    const [post_text, setPost_text] = useState(selectedPost?.post_text)
    const [image_url, setImage_url] = useState(selectedPost?.image_url)
    const [isUpdated, setIsUpdated] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errorArray = []
        if (!post_title) errorArray.push("Title is required.")
        if (!post_text) errorArray.push("Your post needs words.")
        // make optional:
        // if (!image_url) errorArray.push("You should add an image for your post.")

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

        console.log("what is my word", post_text)

        if (editPost) {
            history.push(`/`)
        }
    }



    const showErrors = errors.map((error) => (
        <div className="error-messages" key={error}>
            {error}
        </div>
    ));

    // form need to change on submit:

    return (
        <div className="top-div">
            <div>
            <form className="edit-form" onSubmit={handleSubmit}>
        <div className="editted-container">
            <ul className="messages">{isUpdated && showErrors}</ul>
            <div className="under-editted">
                    <div className="form-title">
                            <h2>
                                Edit your Post
                            </h2>
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
                        <span> Image URL (optional): </span>
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
                {/* <button onClick={handleSubmit} className="submit-button"
                    type="submit"
                    className="submit-button"
                    >
                    Edit your Post
                </button> */}
                </div>

             </div>
            </form>
                <div className="confirm">
                    Are you sure you want to edit?
                </div>
                <button>
                    <div className="edit" onClick={handleSubmit}> Confirm Changes</div>
                </button>
                <button>
                    <div className="cancel" onClick={onClick}>Cancel</div>
                </button>
            </div>
        </div>
    )
}

export default UpdatingPostComp;
