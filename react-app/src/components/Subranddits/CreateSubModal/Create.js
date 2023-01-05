import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { ReadPostBySubrandditIdThunk } from "../../../store/post";

import {
  createSubrandditThunk,
  getAllSubrandditsThunk,
} from "../../../store/subranddit";
import ".././Subranddits.css";
import "./Create.css";

const CreateSubRandditRanked = ({ onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  // const [errors, setErrors] = useState([]);

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState([]);

  // const [isCreated, setIsCreated] = useState(false);

  const thisSubSelected = useSelector((state) => state.subranddits);

  const userIsLoggedIn = useSelector((state) => state.session.user);

  // useEffect(() => {
  //     let errorsArray = []
  //     const imgRegex = new RegExp(
  //         /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
  //     );
  //     if (image_url && !imgRegex.test(image_url)) {
  //         errorsArray.push(
  //             "Invalid Image Url! URL must start with https:// and contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
  //         );
  //     }

  //     setErrors(errorsArray)
  // }, [title, description, image_url])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    if (!title || title?.length > 25) {
      setErrors(["Title must be between 1-25 characters."]);
      return;
    }
    if (!description) {
      setErrors(["Description is required."]);
      return;
    }
    // if (!image_url) {
    //     setErrors(["Please provide an icon."])
    //     return;
    // }

    if (description && description.trim().length === 0) {
      setErrors(["Description is required"]);
      return;
    }

    onClick();

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    let created = await dispatch(
      createSubrandditThunk({
        title,
        description,
        // image_url,
        image,
        // author_id
      })
    );

    if (created) {
      setTitle("");
      setDescription("");
      setImage_url("");
      setErrors([]);
      // onClick()
    }
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push("/images");
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };
  const updateFiles = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="creating-container">
      <div className="encompass-form">
        <div className="menu">
          {/* {userIsLoggedIn && ( */}
          <form onSubmit={handleSubmit} className="subr-class">
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

              <div className="image-input-div">
                <label className="one-label" htmlFor="upload-image-input">
                  <div className="img-icon-and-button">
                  <img className="create-sub-preview" src={imagePreview} alt="" />
                    <div className="image-upload-button">
                      Select from your device
                    </div>
                  </div>

                  <input
                    id="upload-image-input"
                    type="file"
                    onChange={(e) => {
                      updateFiles(e);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="to-press">
              <button
                onClick={handleSubmit}
                className="submit-button"
                type="submit"
              >
                Submit Subranddit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubRandditRanked;
