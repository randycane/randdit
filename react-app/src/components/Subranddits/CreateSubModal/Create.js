import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useHistory } from "react-router";
import { ReadPostBySubrandditIdThunk } from "../../../store/post";

import { createSubrandditThunk, getAllSubrandditsThunk } from "../../../store/subranddit";
import ".././Subranddits.css"
import "./Create.css"

const CreateSubRandditRanked = ({ onClick }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image_url, setImage_url] = useState("")
    const [errors, setErrors] = useState([]);

    // const [isCreated, setIsCreated] = useState(false);

    const thisSubSelected = useSelector((state)=> state.subranddits)

    useEffect(() => {
        let errorsArray = []
        const imgRegex = new RegExp(
            /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
          );
          if (image_url && !imgRegex.test(image_url)) {
            errorsArray.push(
              "Invalid Image Url! URL must start with https:// and contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
            );
          }

        setErrors(errorsArray)
    }, [title, description, image_url])


    // useEffect(() => {
    //     dispatch(getAllSubrandditsThunk())
    // },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsCreated(true);
        if (!title || title?.length>25) {
            setErrors(["Title must be between 1-25 characters."])
            return;
        }
        if (!description) {
            setErrors(["Description is required."])
            return;
        }
        if (!image_url) {
            setErrors(["Please provide an icon."])
            return;
        }

        if (description && description.trim().length === 0) {
            setErrors(["Description is required"])
            return;
        }

        onClick();


    let created = await dispatch(createSubrandditThunk({
            title,
            description,
            image_url,
            // author_id
    }))

        if (created) {
            // history.push('/')
            setTitle("")
            setDescription("")
            setImage_url("")
            setErrors([])

            // onClick()
        }

        // dispatch(getAllSubrandditsThunk())

    };



    return (
        <div className="creating-container">
            <div className="encompass-form">
                <div className="menu">

                </div>
                <form onSubmit={handleSubmit}
                    className="subr-class">
                    <h1 className="sub-title">Create your own Subranddit</h1>
                    <div className="errors">
                        {errors && (
              <ul className="create-sub-form-errors">
                {errors.map((error) => {
                  return <div key={error.id}>{`${error}`}</div>;
                })}
              </ul>
            )}
                    </div>
                    <div className="submit-div">
                        <label className="create-sub">
                            <span> Subranddit Title: </span>
                            <input
                                type="text"
                                placeholder="Title"
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
                            >
                            Submit Subranddit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSubRandditRanked;
