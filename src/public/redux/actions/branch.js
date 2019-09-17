import Axios from 'axios';

export const addBranch = (data) => {
    return{
        type: 'ADD_BRANCH',
        payload: Axios.post('http://localhost:3001/api/branch/', data)
    }
}

export const editBranch = (id, data) => {
    return{
        type: 'EDIT_BRANCH',
        payload: Axios.put(`http://localhost:3001/api/branch/${id}`, data)
    }
}

export const deleteBranch = (id) => {
    return{
        type: 'DELETE_BRANCH',
        payload: Axios.delete(`http://localhost:3001/api/branch/${id}`)
    }
}