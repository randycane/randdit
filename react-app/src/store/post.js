// Action types:

const CREATE_POST = "post/create"
const LOAD_POSTS = "post/load"
const EDIT_POST= "post/edit"
const LOAD_POST_BY_SUB = "subranddit/load_by_sub"
const DEL_POST = "post/delete"

// Action creators:

const writePostAction = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}

const loadPostsAction = (payload) => {
    return {
        type: LOAD_POSTS,
        payload
    }
}

const loadPostsBySubIdAction = (payload) => {
    return {
        type: LOAD_POST_BY_SUB,
        payload
    }
}

const editPostAction = (payload) => {
    return {
        type: EDIT_POST,
        payload
    }
}

const deletePostAction = (payload) => {
    return {
        type: DEL_POST,
        payload
    }
}


// Thunks:
