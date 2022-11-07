import React, { useState } from "react"
import { Modal } from "../../Modals/modal"
import CreatingSubRandditRanked from "./Create"

import "./Create.css"


function CreationModal({ subranddit }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="make-top">
            <div className="create" onClick={()=> setShowModal(true)}>
                Create a new Subranddit!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatingSubRandditRanked subranddit={subranddit} onClick={()=> setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default CreationModal;
