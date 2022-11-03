import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { ReadPostBySubrandditIdThunk } from "../../store/post";
import { deleteSubThunk, getAllSubrandditsThunk, getSubFromIdThunk } from "../../store/subranddit";
import EditSubRandditComponent from "./EditSub";
import PostCardComponent from "../Posts/PostCard";
import SeeThePostsComponent from "../Posts/PostDetails";
import SubrandditCardComponent from "./SubCard";
import CreateSubRandditComponent from "./CreateSub";

import DeletingModal from "./DeleteSubModal";

import "./Subranddits.css"

function SeeSubrandditDetailsComponent() {
    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);

    const dispatch = useDispatch()
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)
    // const [isPosty, setIsPosty]= useState(false)

  // key into my obj state
  const subranddit = useSelector((state) => (state.subranddits[subrandditId]))
  //console.log("obj state", subranddit)

    const subrandditInfo = useSelector((state) => {
        let posts = Object.values(state.posts)
        return posts;
    })

    //logic to see if you are logged in to perform actions
  const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
      dispatch(getSubFromIdThunk(subrandditId))
      dispatch(getAllSubrandditsThunk())
        .then(()=> setIsLoaded(true))
    },[dispatch])

    // delete sub button:
    // const deleteThisSubRn = async (subrandditId) => {
    //     await dispatch(deleteSubThunk(subrandditId)).then(() => {
    //         history.push('/');
    //     })
    // }

  return (
    isLoaded && (
      <>
        <div className="describe">
        <img src={subranddit.image_url} alt="n/a" className="sub-logo"></img>
          <div className="sub-title">Community Title: {subranddit.title}</div>
          <div className="sub-stuff">About: {subranddit.description}</div>
        </div>

        <div className="see-posts">
          <SeeThePostsComponent/>
        </div>
        <div className="subranddit-stuff">
            <EditSubRandditComponent/>
        </div>

        <div className="undercard">
          <DeletingModal subranddit={subranddit}/>
        </div>

      {/* <div className="undercard">
      <button
      className="delete-button"
      onClick={() =>
        deleteThisSubRn(subrandditId)
      }>
      Delete Subranddit
    </button>
    </div> */}
    </>
    )
  )
}

export default SeeSubrandditDetailsComponent;
