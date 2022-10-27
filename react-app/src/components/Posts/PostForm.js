import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom"
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
    // to do:
    // dispatch(WriteAPostThunk({

    // }))
}


export default PostFormComponent;
