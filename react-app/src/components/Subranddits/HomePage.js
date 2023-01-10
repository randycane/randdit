import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubrandditsThunk } from "../../store/subranddit";
import SubrandditCardComponent from "./SubCard";
import { Link } from "react-router-dom";
import CreateSubRandditComponent from "./CreateSub";
import { useHistory } from "react-router";
import DeletingModal from "./DeleteSubModal";
import CreatingSubRandditComponent from "./CreateSubModal/Create";
import CreationModal from "./CreateSubModal";

import "./Subranddits.css";

function SeeTheSubsComponent() {
  const dispatch = useDispatch();

  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const everysub = useSelector((state) => state.subranddits);
  const normalizedSub = Object.values(everysub);

  const reversedSub = normalizedSub.sort().reverse();

  useEffect(() => {
    dispatch(getAllSubrandditsThunk());
  }, [dispatch, JSON.stringify(everysub)]);

  return (
    <>
      <div className="whole-page-container">
        <div className="toman"></div>
        {sessionUser && (
          <div className="outer-container">
            <div className="right-under">
              <CreationModal />
            </div>
          </div>
        )}
        <div className="right-side-rec">
          <label className="label-name">Recommended communities below!</label>
          {reversedSub.length > 0 && (
            <div className="single-sub">
              {reversedSub.map((subranddit) => (
                <div key={subranddit.id} className="each-sub">
                  <Link to={`/subranddits/${subranddit.id}`}>
                    <SubrandditCardComponent subranddit={subranddit} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SeeTheSubsComponent;
