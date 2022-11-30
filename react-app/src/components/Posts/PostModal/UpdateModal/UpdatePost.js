import React, { useState, useEffect } from "react"
import { Modal } from "../../../Modals/modal"

import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"

import { EditPostThunk } from "../../../../store/post"

import "./Update.css"

function UpdatingPostComp({ post, onClick }) {

    const dispatch = useDispatch()
    const history = useHistory()


    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);
    let { postId } = useParams();
    postId = Number(postId)

    const selectedSubranddit = useSelector((state) => state?.subranddits)
    //console.log("what is this sub on rn", selectedSubranddit)

    const selectedPost = useSelector(state => state?.posts[post.id])
    //console.log("show me the state", selectedPost)

    const selectedAuthor = useSelector((state) => state?.session.user)
    //console.log("jkrowling", selectedAuthor)


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

        let payload = {
            id: post?.id,
            post_title: post_title,
            post_text: post_text,
            image_url: image_url,
            subranddit_id: selectedSubranddit.id,
            author_id: selectedAuthor.id
        }

        dispatch(EditPostThunk(payload))
        onClick();


    }



    const showErrors = errors.map((error) => (
        <div className="error-messages" key={error}>
            {error}
        </div>
    ));


    return (
        <div className="top-div">
            <div>
            <form className="edit-form" onSubmit={handleSubmit}>
        <div className="editted-container">
            <ul className="messages">{isUpdated && showErrors}</ul>
            <div className="under-editted">
                    <div className="form-edit">
                                Edit your Post
                        </div>
                    <div className="edit-input-container">
                        <div className="each-editted"> Title: </div>
                        <label>
                                    <textarea
                                        style = {{fontFamily: "Times New Roman", fontSize: "16px"}}
                                type="text"
                                placeholder="title"
                                value={post_title}
                                onChange={(e) => setPost_title(e.target.value)}
                            />
                        </label>
                        <div className="each-editted"> Text: </div>
                        <label>
                                    <textarea
                                        style = {{fontFamily: "Times New Roman", fontSize: "16px"}}
                                type="text"
                                placeholder="description"
                                value={post_text}
                                onChange={(e) => setPost_text(e.target.value)}
                            />
                        </label>
                        <div className="each-editted"> Image URL (optional): </div>
                        <label>
                                    <textarea
                                        style = {{fontFamily: "Times New Roman", fontSize: "16px"}}
                                type="text"
                                placeholder="image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}
                            />
                        </label>
                    </div>
                 </div>
                <div className="to-press">
                </div>

             </div>
            </form>
                <div className="sure">
                    Are you sure you want to edit?
                </div>
                <button className="confirmation" >
                    <div onClick={handleSubmit}>Confirm Changes</div>
                </button>
                <button className="cancellation" >
                    <div onClick={onClick}>Cancel</div>
                </button>
            </div>
        </div>
    )
}

export default UpdatingPostComp;
