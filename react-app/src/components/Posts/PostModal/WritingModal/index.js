import React, { useState } from "react"


import {Modal } from "../../../Modals/modal"

// import UpdatingPostComp from "./UpdatePost"
// import WritingPostFormComponent from "./WritePost"
import PostFormComponent from "../../PostForm"

function WritingPostModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="deletion" onClick={()=> setShowModal(true)}>
                Create your Post!
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <PostFormComponent onClick={(onClick)=> setShowModal(false)}/> */}
                    <PostFormComponent setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}

export default WritingPostModal;
