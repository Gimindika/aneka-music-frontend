import Axios from 'axios';
const url = 'https://quiet-atoll-55962.herokuapp.com';


export const getCategories = () => {
    return{
        type: 'GET_CATEGORIES',
        payload: Axios.get(`${url}/api/categories/`)
    }
}

export const addCategory = (data, header) => {
    return{
        type: 'ADD_CATEGORY',
        payload: Axios.post(`${url}/api/categories/`, data, header)
    }
}

export const editCategory = (id, data, header) => {
    return{
        type: 'EDIT_CATEGORY',
        payload: Axios.put(`${url}/api/categories/${id}`, data, header)
    }
}

export const deleteCategory = (id, header) => {
    return{
        type: 'DELETE_CATEGORY',
        payload: Axios.delete(`${url}/api/categories/${id}`, header)
    }
}

export const setDisplay = (status) => {
    return{
        type: 'SET_DISPLAY',
        payload: status
    }
}