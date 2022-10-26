import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useHistory } from "react-router";

import { createSubrandditThunk } from "../../store/subranddit";
import "./Subranddits.css"

const CreateSubRandditComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image_url, setImage_url] = useState("")
    const [errors, setErrors] = useState([]);

    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        let errorsArray = []
        if (!title) errorsArray.push("A title is required.");
        if (!description) errorsArray.push("Description is required.");
        if (!image_url) errorsArray.push("Please provide an icon.");

        setErrors(errorsArray)
    },[title, description, image_url])

    const handleSubmit = (e) => {
        e.prevent.default();
        setIsCreated(true);
        if (errors.length > 0) return;

        let newSubranddit = dispatch(createSubrandditThunk({
            title,
            description,
            image_url
        }))

        //history.push(`/subranddits/${newSubranddit.id}`)
    };

    const ErrorMsgs = errors.map(error => (
        <div className="errors" key={error}>{error}</div>
    ));

    return (
        <div className="creating-container">
            <div className="encompass-form">
                <form
                    className="subr-class" onSubmit={handleSubmit}>
                    <h1 className="sub-title">Create a community</h1>
                    <div className="errors">
                        {isCreated && ErrorMsgs}
                    </div>
                    <div className="submit-div">
                        <label className="create-sub">
                            <span> Subranddit Name: </span>
                            <input
                                type="text"
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}

                            />
                        </label>

                        <label className="create-description">
                            <span> Description: </span>
                            <input
                                type="text"
                                placeholder="About"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </label>
                        <label className="create-image">
                            <span> Subranddit Image: </span>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}

                            />
                        </label>
                    </div>
                    <div className="to-press">
                        <button className="submit-button3"
                            type="submit">
                            Create Subranddit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSubRandditComponent;
