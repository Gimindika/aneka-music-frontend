import Axios from 'axios';
const url = 'https://quiet-atoll-55962.herokuapp.com';

export const getBranch = () => {
    return{
        type: 'GET_BRANCH',
        payload: Axios.get(`${url}/api/branch/`)
    }
}

export const addBranch = (data, header) => {
    return{
        type: 'ADD_BRANCH',
        payload: Axios.post(`${url}/api/branch/`, data, header)
    }
}

export const editBranch = (id, data, header) => {
    return{
        type: 'EDIT_BRANCH',
        payload: Axios.put(`${url}/api/branch/${id}`, data, header)
    }
}

export const deleteBranch = (id, header) => {
    return{
        type: 'DELETE_BRANCH',
        payload: Axios.delete(`${url}/api/branch/${id}`, header)
    }
}