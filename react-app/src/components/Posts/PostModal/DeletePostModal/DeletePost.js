import React, { useState } from "react"
import { Modal } from "../../../Modals/modal"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"

import { deletePostThunk } from "../../../../store/post"

import "./Del.css"
import { getAllSubrandditsThunk, getSubFromIdThunk } from "../../../../store/subranddit"

function DeletePostComp({ post, onClick }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const thispost = useSelector((state) => Object.values(state?.posts))


    let { postId } = useParams();
    postId = Number(postId)

    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId)



    const onDel = () => {
        dispatch(deletePostThunk(post.id))
        dispatch(getSubFromIdThunk(subrandditId))
        // dispatch(getAllSubrandditsThunk())
        onClick()

        // history.push(`/subranddits/${subrandditId}`)
    }

    return (
        <div>
            <div>
                <h1>
                    Delete Post
                </h1>
                <div className="sure">
                    Are you sure you want to delete?
                </div>
                <button>
                    <div className="deletion" onClick={onDel}> Confirm Deletion</div>
                </button>
                <button>
                    <div className="cancel" onClick={onClick}>Cancel</div>
                </button>
            </div>
        </div>
    )
}

export default DeletePostComp;
