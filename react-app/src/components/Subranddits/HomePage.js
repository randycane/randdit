import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getAllSubrandditsThunk } from "../../store/subranddit";
import SubrandditCardComponent from "./SubCard";
import { Link } from "react-router-dom";
import CreateSubRandditComponent from "./CreateSub";

import "./Subranddits.css"

function SeeTheSubsComponent() {
    const dispatch = useDispatch();


    const sessionUser = useSelector((state => state.session.user));
    const everysub = useSelector((state) => state.subranddits)
    const normalizedSub = Object.values(everysub);
    // console.log("please show me the subs", everysub)
    // console.log("should be normalized sbs", normalizedSub)

    useEffect(() => {
        dispatch(getAllSubrandditsThunk())
    }, [dispatch])



    return (
        <>
            <div className="whole-page-container">
                {/* <div className="create-button" onClick={(CreateSubRandditComponent)}>
                    Create your own community!
                </div> */}
                {sessionUser && (
                <div className="outer-container">
                    <div className="right-under">
                        <CreateSubRandditComponent/>
                    </div>
                </div>
                )}
                    <label className="label-name"> Find the subranddit for you</label>
                    {normalizedSub.length> 0 && (
                        <div className="single-sub">
                            {normalizedSub.map((subranddit) => (
                                <div key={subranddit.id} className="each-sub">
                                    <Link to={`/subranddits/${subranddit.id}`}>
                                        <SubrandditCardComponent subranddit={subranddit} /> </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </>
    )
}

export default SeeTheSubsComponent;
