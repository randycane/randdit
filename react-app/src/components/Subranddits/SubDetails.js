import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { ReadPostBySubrandditIdThunk } from "../../store/post";
import { deleteSubThunk, getSubFromIdThunk } from "../../store/subranddit";

function SeeSubrandditDetailsComponent() {
    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId);

    const dispatch = useDispatch()
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)
    const [isPosty, setIsPosty]= useState(false)

    const subranddit = useSelector((state) => Object.values(state.subranddits))

    const subrandditInfo = useSelector((state) => {
        let posts = Object.values(state.posts)
        return posts;
    })

    //logic to see if you are logged in to perform actions
    const sessionUser = useSelector((state)=> state.session.user)

    useEffect(() => {
        if (isNaN(subrandditId)) {
          setIsLoaded(true);
          setIsPosty(true);
        } else {
          dispatch(getSubFromIdThunk(subrandditId)).then(() => {
            setIsLoaded(true);
          });
          dispatch(ReadPostBySubrandditIdThunk(subrandditId)).then(() => {
            setIsPosty(true);
          });
        }
    }, [dispatch, subrandditId]);


    //without posts underneath for now:

    // useEffect(() => {
    //     dispatch(getSubFromIdThunk(subrandditId))
    //     .then(()=> setIsLoaded(true))
    // },[dispatch, isLoaded])

    // delete a post if you own it:
    const deleteThisSubRn = async (subrandditId) => {
        await dispatch(deleteSubThunk(subrandditId)).then(() => {
            history.push('/');
        })
    }

    return isLoaded && (
        <div className="subranddit-stuff">
            {subrandditInfo}
        </div>
    )
}

export default SeeSubrandditDetailsComponent;
