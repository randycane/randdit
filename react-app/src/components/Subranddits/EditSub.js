import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {editSubThunk, getSubFromIdThunk} from "../../store/subranddit"


function EditSubRandditComponent({ subrandditId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const subranddit = useSelector(state => state.subranddit)

    const thisSub = subranddit[subrandditId]

    const [title, setTitle] = useState(subranddit.title)
    const [description, setDescription] = useState(subranddit.description)
    const [image_url, setImage_url] = useState(subranddit.image_url)

    const [errors, setErrors] = useState([])

    const [isEditted, setIsEditted] = useState(false);

    useEffect(() => {
        if (subranddit.name) {
            setTitle(subranddit.title);
            setDescription(subranddit.description);
            setImage_url(subranddit.image_url);
        }
    }, [subranddit])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        let newSubData = {
            id: subrandditId,
            title: title,
            description: description,
            image_url: image_url

        };
        return dispatch(editSubThunk(payload)).then(
            async (response) => {
                if (!response.errors) {
                    setIsEditted(true);
                }
                else setErrors(Object.values(response.errors));
            }
        )
    }

    if (isEditted) {
        return (
            <div className="editted-container">
                <div className="under-editted">
                    <form className="edit-form" onSubmit={handleSubmit}>
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
                    </form>
                </div>
            </div>
        )
    }
 }

export default EditSubRandditComponent;
