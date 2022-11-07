import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect, useParams} from "react-router-dom"
import { WriteAPostThunk } from "../../store/post";

import "./Posts.css"

function PostFormComponent() {
    const dispatch = useDispatch()
    const history = useHistory()
    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);

    const [post_title, setPost_title] = useState("")
    const [post_text, setPost_text] = useState("")
    const [image_url, setImage_url] = useState("")
    // const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     let errorsArray = []
    //     if (!image_url) errorsArray.push("Please provide valid image.")
    //     if (!post_title) errorsArray.push("Please provide a valid Title.")
    //     if (!post_text) errorsArray.push("Please provide a valid post text body.")

    //     setErrors(errorsArray)
    // }, [post_title, post_text, image_url])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post_title) {
            setErrors(["Please provide a valid Title."])
            return;
        }
        if (!post_text) {
            setErrors(["Please provide a valid post text body."])
            return;
        }
        // setIsSubmitted(true)
        // if (errors.length > 0) return;
        const payload = {post_title: post_title, post_text: post_text, image_url: image_url, subrandditId: subrandditId}
        // to dispatch:
        // await dispatch(WriteAPostThunk(payload))

        let apost = await dispatch(WriteAPostThunk(payload))
        if (apost) {
            history.push(`/subranddits/${subrandditId}`)

        }
        setPost_title("");
        setPost_text("")
        setImage_url("");
        setErrors([]);
    }


    const ErrorMsgs = errors.map(error => (
        <div className="errors" key={error}>{error}</div>
    ));

    return (
        <div className="highpostform">
            <div className="over-form">
                <form className="highform" onSubmit={handleSubmit}>
                    <h1 className="high-top"> Write a post</h1>
                    <div className="errors">
                    {errors && (
              <ul className="create-sub-form-errors">
                {errors.map((error) => {
                  return <div key={error}>{`${error}`}</div>;
                })}
              </ul>
            )}
                    </div>
                        <label className="form">
                            <span> Post Title: </span>
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={post_title}
                            onChange={(e) => setPost_title(e.target.value)}
                            // required
                            />
                    </label>
                    <label className="form">
                            <span> Post text: </span>
                            <input
                                type="text"
                                placeholder="Post text"
                                value={post_text}
                            onChange={(e) => setPost_text(e.target.value)}
                            // required
                            />
                    </label>
                    <label className="form">
                            <span> Post image (optional): </span>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}
                            />
                    </label>
                    <div className="bottom-end">
                        <button onClick={handleSubmit} type="submit" className="submit-now">
                            Submit your post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default PostFormComponent;
