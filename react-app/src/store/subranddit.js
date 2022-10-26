// Action type:

const CREATE_SUB = "subranddit/create"
const LOAD_SUB = "subranddit/load"
const EDIT_SUB = "subranddit/edit"
const DEL_SUB = "subranddit/delete"

// Action creators:

const createNewSubAction = (payload) => {
    return {
        type: CREATE_SUB,
        payload
    }
}

const loadSubAction = (payload) => {
    return {
        type: LOAD_SUB,
        payload
    }
}

const editSubAction = (payload) => {
    return {
        type: EDIT_SUB,
        payload
    }
}

const deleteSubAction = (payload) => {
    return {
        type: DEL_SUB,
        payload
    }
}


//Thunks:

export const getAllSubrandditsThunk = () => async dispatch => {
    const response = await fetch(`/api/subranddits/`, {
        method: "GET"
    })
    const data = await response.json();
    if (response.ok){
        dispatch(loadSubAction(data))
    }

    return data
}

export const createSubrandditThunk = (subranddit) => async dispatch => {
    const response = await fetch(`/api/subranddit/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subranddit)
    })

    if (response.ok) {
      const newSubr = await response.json()
      dispatch(createNewSubAction(newSubr))
      return newSubr
    }
    return response.json()
}

export const editSubThunk = (payload, subrandditId) => async dispatch => {
    const response = await fetch(`/api/subranddits/${subrandditId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const updatedSubr = await response.json();
        dispatch(editSubAction(updatedSubr))
    }
    return response
}

export const deleteSubThink = (subrandditId) => async dispatch => {
    const response = await fetch(`/api/subranddits/${subrandditId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSubAction(subrandditId))
    }
}

//Reducer:
