import React, { useState } from "react"
import { Modal } from "../../Modals/modal"
import CreatingSubRandditRanked from "./Create"

import "./Create.css"


function CreationModal({ subranddit }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="make-top">
            <div className="create" onClick={()=> setShowModal(true)}>
                Create your own Subranddit!
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
