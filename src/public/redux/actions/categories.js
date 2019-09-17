import Axios from 'axios';

export const getCategories = () => {
    return{
        type: 'GET_CATEGORIES',
        payload: Axios.get('http://localhost:3001/api/categories/')
    }
}

export const addCategory = (data) => {
    return{
        type: 'ADD_CATEGORY',
        payload: Axios.post('http://localhost:3001/api/categories/', data)
    }
}

export const editCategory = (id, data) => {
    return{
        type: 'EDIT_CATEGORY',
        payload: Axios.put(`http://localhost:3001/api/categories/${id}`, data)
    }
}

export const deleteCategory = (id) => {
    return{
        type: 'DELETE_CATEGORY',
        payload: Axios.delete(`http://localhost:3001/api/categories/${id}`)
    }
}