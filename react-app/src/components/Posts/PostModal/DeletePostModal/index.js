import React, { useState } from "react"


import {Modal } from "../../../Modals/modal"

import DeletePostComp from "./DeletePost"


function DeletingPostModal({ post}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="deletion" onClick={()=> setShowModal(true)}>
                Delete!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeletePostComp post={post} onClick={()=> setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default DeletingPostModal;
