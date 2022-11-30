import React, { useState } from "react"
import { Modal } from "../../Modals/modal"

import UpdatingSubComp from "./UpdateSub"

import "./UpdateSub.css"


function UpdatingModal({ subranddit }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="updating" onClick={()=> setShowModal(true)}>
                Update your Sub!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdatingSubComp subranddit={subranddit} onClick={()=> setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default UpdatingModal;
