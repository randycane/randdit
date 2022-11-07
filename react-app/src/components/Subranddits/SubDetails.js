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
import UpdatingModal from "./UpdateSubModal";


import "./Subranddits.css"

function SeeSubrandditDetailsComponent() {
    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);

    const dispatch = useDispatch()
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)


  // key into my obj state
  const subranddit = useSelector((state) => (state.subranddits[subrandditId]))
  //console.log("obj state", subranddit)

  const subrandditposter = useSelector((state) => state.posts)
  console.log("who rote this", subrandditposter)

  const normalizedPoster = Object.values(subrandditposter)
  console.log("this is normal", normalizedPoster)



    //logic to see if you are logged in to perform actions
  const sessionUser = useSelector((state) => state.session.user)
  // console.log("i am:", sessionUser)




    useEffect(() => {
      dispatch(getSubFromIdThunk(subrandditId))
      dispatch(getAllSubrandditsThunk())
        .then(()=> setIsLoaded(true))
    },[dispatch, subrandditId])



  return (
    isLoaded && (
      <>
        <div className="describe">
          <img src={subranddit.image_url} alt="n/a"
            onError={(e) => {
            e.currentTarget.src = "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg"
          }}
            className="sub-logo"></img>
          <div className="sub-title">Community Title: {subranddit.title}</div>
          <div className="sub-stuff">About: {subranddit.description}</div>
        </div>

        <div className="see-posts">
          <SeeThePostsComponent/>
        </div>
        {/* {sessionUser && sessionUser.id === normalizedPoster.map((poster)=> poster.id) && ( */}
        <div className="manjiro">
        <div className="update-stuff">
          <UpdatingModal subranddit={subranddit}/>
        </div>

        <div className="undercard">
          <DeletingModal subranddit={subranddit}/>
        </div>
        </div>
         {/* )} */}
    </>
    )
  )
}

export default SeeSubrandditDetailsComponent;
