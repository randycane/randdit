import React, { useState } from "react"


import {Modal } from "../../../Modals/modal"

import UpdatingPostComp from "./UpdatePost"


function UpdatingPostModal({ post}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="deletion" onClick={()=> setShowModal(true)}>
                Edit!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdatingPostComp post={post} onClick={()=> setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default UpdatingPostModal;
