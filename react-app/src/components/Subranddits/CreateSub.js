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
        if (!title || title?.length>25) errorsArray.push("Please provide title between 1 and 25 characters.");
        if (!description) errorsArray.push("Description is required.");
        if (!image_url) errorsArray.push("Please provide an icon.");

        setErrors(errorsArray)
    }, [title, description, image_url])

    useEffect(() => {
        const errors = [];
        const imgRegex = new RegExp(
          /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        );
        if (image_url && !imgRegex.test(image_url)) {
          errors.push(
            "Invalid Image Url! URL must start with https:// and contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
          );
        }
        setErrors(errors);
    }, [image_url]);

    useEffect(() => {
        dispatch(getAllSubrandditsThunk())
    },[dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreated(true);

        // if (errors.length > 0) return;

    dispatch(createSubrandditThunk({
            title,
            description,
            image_url,
            // author_id
    }))
        setTitle("")
        setDescription("")
        setImage_url("")
        setErrors([])

        dispatch(getAllSubrandditsThunk())

    };

    const ErrorMsgs = errors.map(error => (
        <div className="errors" key={error}>{error}</div>
    ));


    return (
        <div className="creating-container">
            <div className="encompass-form">
                <div className="menu">

                </div>
                <form onSubmit={handleSubmit}
                    className="subr-class">
                    <h1 className="sub-title">Create your own Subranddit</h1>
                    <div className="errors">
                        {isCreated && ErrorMsgs}
                    </div>
                    <div className="submit-div">
                        <label className="create-sub">
                            <span> Subranddit Title: </span>
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
                        <button onClick={handleSubmit} className="sub-button"
                            type="submit"
                            disabled={isCreated && errors.length > 0}

                            className={
                                isCreated && errors.length > 0 ? "dog" : "submit-button"
                            }
                            >
                            Submit Subranddit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSubRandditComponent;
