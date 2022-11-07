import React, { useState } from "react"
import { Modal } from "../../Modals/modal"
import CreatingSubRandditRanked from "./Create"


function CreationModal({ subranddit }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="create" onClick={()=> setShowModal(true)}>
                Create!
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
