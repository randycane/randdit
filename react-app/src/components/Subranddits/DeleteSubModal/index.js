import React, { useState } from "react"
import { Modal } from "../../Modals/modal"

import DeleteSubComp from "./DelSubModal"


function DeletingModal({ subranddit }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="deletion" onClick={()=> setShowModal(true)}>
                Delete!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteSubComp subranddit={subranddit} onClick={()=> setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default DeletingModal;
