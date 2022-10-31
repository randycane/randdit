import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect, useParams} from "react-router-dom"
import { WriteAPostThunk } from "../../store/post";

function PostFormComponent() {
    const dispatch = useDispatch()
    const history = useHistory()
    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);

    const [post_title, setPost_title] = useState("")
    const [post_text, setPost_text] = useState("")
    const [image_url, setImage_url] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errorsArray = []
        if (!image_url) errorsArray.push("Please provide valid image.")
        if (!post_title) errorsArray.push("Please provide a valid Title.")
        if (!post_text) errorsArray.push("Please provide a valid post text body.")

        setErrors(errorsArray)
    }, [post_title, post_text, image_url])

    let handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        if (errors.length > 0) return;
    }
    // to dispatch:
    dispatch(WriteAPostThunk({
        post_title,
        post_text,
        image_url
    }))

    history.push(`/subranddits/${subrandditId}`)

    const ErrorMsgs = errors.map(error => (
        <div className="errors" key={error}>{error}</div>
    ));

    return (
        <div className="highpostform">
            <div className="over-form">
                <form className="highform" onSubmit={handleSubmit}>
                    <h1 className="high-top"> Write your post</h1>
                    <div className="messages">
                        {isSubmitted && ErrorMsgs}

                    </div>
                        <label className="form">
                            <span> Post Title: </span>
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={post_title}
                                onChange={(e) => setPost_title(e.target.value)}
                            />
                    </label>
                    <label className="form">
                            <span> Post text: </span>
                            <input
                                type="text"
                                placeholder="Post text"
                                value={post_text}
                                onChange={(e) => setPost_text(e.target.value)}
                            />
                    </label>
                    <label className="form">
                            <span> Post image: </span>
                            <input
                                type="text"
                                placeholder="Post image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}
                            />
                    </label>
                    <div className="end-button">
                        <button type="submit">
                            Write your post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default PostFormComponent;
