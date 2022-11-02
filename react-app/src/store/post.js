// Action types:

const CREATE_POST = "post/create"
const LOAD_POSTS = "post/load"
const EDIT_POST= "post/edit"
const LOAD_POST_BY_SUB = "subranddit/load_by_sub"
const DEL_POST = "post/delete"

// Action creators:

const writePostAction = (subrandditId) => {
    return {
        type: CREATE_POST,
        subrandditId
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

// export const WriteAPostThunk = (subrandditId) => async dispatch => {

//     const response = await fetch(`/api/subranddits/${subrandditId}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(subrandditId)
//     })
//     console.log("reply", response)
//     if (response.ok) {
//         const newpost = await response.json()
//         dispatch(writePostAction(newpost))
//         return newpost;
//     }
// }

export const WriteAPostThunk = (data) => async dispatch => {
    const { post_title, post_text, image_url, subrandditId} = data
    const formData = new FormData()
    formData.append('post_title', post_title)
    formData.append('post_text', post_text)
    formData.append('image_url', image_url)
    formData.append('subrandditId', subrandditId)

    const response = await fetch(`/api/subranddits/${data.subrandditId}`, {
        method: "POST",
        body: formData,
    })
    const newPost = await response.json();
    dispatch(writePostAction(newPost))
    return newPost;
}

// Read all posts:
export const ReadPostsThunk = () => async dispatch => {
    const response = await fetch(`/api/posts/all`)
    if (response.ok) {
        const allposts = await response.json()
        dispatch(loadPostsAction(allposts))
        return allposts
    }
}

// Get all posts by its subranddit id:
export const ReadPostBySubrandditIdThunk = (subrandditId) => async dispatch => {
    const response = await fetch(`/api/subranddits/${subrandditId}/posts`)
    if (response.ok) {
        const allposts = await response.json();
        //console.log("check reducer", allposts)
        dispatch(loadPostsBySubIdAction(allposts))
        return allposts;
    }
}

// Edit your post:
export const EditPostThunk = (payload, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const editted = await response.json()
        dispatch(editPostAction(editted))
        return editted;
    }

}

//Delete post:

export const deletePostThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deletePostAction(postId))
    }
}

//Reducer:

let initialState = {};

const postReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case CREATE_POST: {
            newState = { ...state };
            newState[action.subrandditId.id] = action.subrandditId
            return newState
        }
        case LOAD_POSTS: {
            action.payload.forEach((post) => {
                newState[post.id] = post
            })
            return { ...newState };
        }
        case LOAD_POST_BY_SUB: {
            action.payload.forEach((post) => {
                newState[post.id] = post
            })
            return { ...newState };
        }
        case EDIT_POST: {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState
        }
        case DEL_POST: {
            newState = { ...state };
            delete newState[action.postId];
            return newState
        }
        default:
            return state;
    }
}

export default postReducer;
