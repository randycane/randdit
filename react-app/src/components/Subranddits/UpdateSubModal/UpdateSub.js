import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import {editSubThunk, getSubFromIdThunk} from "../../store/subranddit"

import { editSubThunk, getSubFromIdThunk } from "../../../store/subranddit"

import "./UpdateSub.css"

function UpdatingSubComp({onClick}) {
    const dispatch = useDispatch();
    const history = useHistory();

    let { subrandditId } = useParams();

    const subranddit = useSelector(state => state?.subranddits[subrandditId])

    //console.log("state rn", subranddit)


    const [title, setTitle] = useState(subranddit?.title)
    const [description, setDescription] = useState(subranddit?.description)
    const [image_url, setImage_url] = useState(subranddit?.image_url)

    const [errors, setErrors] = useState([])

    const [isEditted, setIsEditted] = useState(false);

    useEffect(() => {
        let errorArray = []
        if (!title) errorArray.push("Title is required.")
        if (!description) errorArray.push("Description is required")
        if (!image_url) errorArray.push("You need an icon for your subranddit.")

        setErrors(errorArray)
    }, [title, description, image_url])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditted(true);
        if (errors.length > 0) return;

        let editSub = dispatch(editSubThunk({
            title,
            description,
            image_url
        }, subrandditId))
        if (editSub) {
            history.push(`/subranddits/${subrandditId}`)

        }
        onClick()
    }


    const showErrors = errors.map((error) => (
        <div className="error-messages" key={error}>
            {error}
        </div>
    ));
    return (
                <form className="edit-form" onSubmit={handleSubmit}>
                <div className="editted-container">
                    <ul className="messages">{isEditted && showErrors}</ul>
                    <div className="under-editted">
                            <div className="form-title">
                                <span> Edit your Subranddit: </span>
                    </div>
                            <div className="edit-input-container">
                                <span> Title: </span>
                                <label>
                                    <textarea
                                        type="text"
                                        placeholder="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <span> Description: </span>
                                <label>
                                    <textarea
                                        type="text"
                                        placeholder="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
                        <button onClick className="submitter"
                            type="submit"
                            className="submit-success"
                            >
                            Edit Subranddit
                        </button>
                    </div>
                </div>
                </form>
            )
}





export default UpdatingSubComp;
