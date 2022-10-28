import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function EditSubRandditComponent({ subrandditId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const subranddit = useSelector(state => state.subranddit)

    const thisSub = subranddit[subrandditId]

    const [title, setTitle] = useState(subranddit.title)
    const [description, setDescription] = useState(subranddit.description)
    const [image_url, setImage_url] = useState(subranddit.image_url)

    const [errors, setErrors] = useState([])
}

export default EditSubRandditComponent;
