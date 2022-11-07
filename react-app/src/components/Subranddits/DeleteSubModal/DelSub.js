import React, { useState } from "react"
import { Modal } from "../../Modals/modal"

import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { deleteSubThunk } from "../../../store/subranddit"

import "./DelSub.css"

function DeleteSubComp({ subranddit, onClick }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const thissub = useSelector((state) => Object.values(state?.subranddits))

    let { subrandditId } = useParams();
    subrandditId = Number(subrandditId)

    const onDel = () => {
        dispatch(deleteSubThunk(subranddit.id))

        history.push("/")
    }

    return (
        <div>
            <div>
                <h1>
                    Delete Subranddit
                </h1>
                <div>
                    Are you sure you want to delete?
                </div>
                <button className="conference">
                    <div className="conf" onClick={onDel}> Confirm Deletion</div>
                </button>
                <button>
                    <div className="cancel" onClick={onClick}>Cancel</div>
                </button>
            </div>
        </div>
    )
}

export default DeleteSubComp
