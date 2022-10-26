import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getAllSubrandditsThunk } from "../../store/subranddit";
import SubrandditCardComponent from "./SubCard";
import { Link } from "react-router-dom";
import CreateSubRandditComponent from "./CreateSub";

import "./Subranddits.css"

function SeeTheSubs() {
    const dispatch = useDispatch();

    const everysub = useSelector((state) => state.subranddits)
    const normalizedSub = Object.values(everysub);

    useEffect(() => {
        dispatch(getAllSubrandditsThunk())
    }, [dispatch])



    return (
        <>
            <div className="whole-page-container">
                <div className="create-button" onClick={(CreateSubRandditComponent)}>
                    Create your own community!
                </div>
                <div className="outer-container">
                    <label className="label-name"> Find the subranddit for you</label>
                    {everysub && (
                        <div className="single-sub">
                            {normalizedSub.map((subranddit) => (
                                <div className="each-sub">
                                    <Link to={`/subranddits/${subranddit.id}`}>
                                        <SubrandditCardComponent subranddit={subranddit} /> </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </>
    )
}

export default SeeTheSubs;
