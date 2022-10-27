import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { getSubFromIdThunk } from "../../store/subranddit";

function SeeSubrandditDetailsComponent() {
    const { subrandditId } = useParams();

    const dispatch = useDispatch()
    const useHistory = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)

    const subranddit = useSelector((state) => state.subranddits)

    const subrandditInfo = subranddit[subrandditId]

    useEffect(() => {
        dispatch(getSubFromIdThunk(subrandditId))
        .then(()=> setIsLoaded(true))
    },[dispatch, isLoaded])

    return isLoaded && (
        <div className="subranddit-stuff">
            {subrandditInfo}
        </div>
    )
}

export default SeeSubrandditDetailsComponent;
