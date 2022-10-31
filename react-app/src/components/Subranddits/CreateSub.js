import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {Redirect, useHistory } from "react-router";
import { ReadPostBySubrandditIdThunk } from "../../store/post";

import { createSubrandditThunk, getAllSubrandditsThunk } from "../../store/subranddit";
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
        e.preventDefault();

        // console.log("submit triggered")

        setIsCreated(true);
        if (errors.length > 0) return;


        // console.log("title", title)
        // console.log("descrip", description)
        // console.log("img", image_url)

    dispatch(createSubrandditThunk({
            title,
            description,
            image_url,
            // author_id
    }))

        dispatch(getAllSubrandditsThunk())

    };

    const ErrorMsgs = errors.map(error => (
        <div className="errors" key={error}>{error}</div>
    ));

    return (
        <div className="creating-container">
            <div className="encompass-form">
                <form onSubmit={handleSubmit}
                    className="subr-class">
                    <h1 className="sub-title">Create your own Subranddit!</h1>
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
                                required
                            />
                        </label>

                        <label className="create-description">
                            <span> Description: </span>
                            <input
                                type="text"
                                placeholder="About"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <label className="create-image">
                            <span> Subranddit Image: </span>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={image_url}
                                onChange={(e) => setImage_url(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="to-press">
                        <button onClick={handleSubmit} className="submit-button"
                            type="submit"
                            className="submit-button"
                            >
                            Create Subranddit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSubRandditComponent;
