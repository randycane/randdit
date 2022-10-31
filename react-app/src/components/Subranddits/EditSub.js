import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {editSubThunk, getSubFromIdThunk} from "../../store/subranddit"


function EditSubRandditComponent({ subrandditId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const subranddit = useSelector(state => state.subranddits)

    console.log("state rn", subranddit)

    const thisSub = subranddit[subrandditId]

    const [title, setTitle] = useState(subranddit.title)
    const [description, setDescription] = useState(subranddit.description)
    const [image_url, setImage_url] = useState(subranddit.image_url)

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
    }


    let edittedSubData = dispatch(editSubThunk({
        title,
        description,
        image_url
    }))
        // let newSubData = {
        //     id: subrandditId,
        //     title: title,
        //     description: description,
        //     image_url: image_url

        // };
    if (edittedSubData.errors) setErrors([...Object.values(edittedSubData.errors)])
    else dispatch(getSubFromIdThunk(subrandditId))

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
                <button className="to-click">Edit subranddit</button>
                </div>
                </form>
            )
}





export default EditSubRandditComponent;
