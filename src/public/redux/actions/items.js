import Axios from 'axios';

export const getItemsByCategory = (id) => {
    return{
        type: 'GET_ITEMS_BYCATEGORY',
        payload: Axios.get(`http://localhost:3001/api/items/category/${id}`)
    }
}

export const getItemsByBranch = (id) => {
    return{
        type: 'GET_ITEMS_BYBRANCH',
        payload: Axios.get(`http://localhost:3001/api/items/branch/${id}`)
    }
}

export const getItemsByName = (name) => {
    return{
        type: 'GET_ITEMS_BYNAME',
        payload: Axios.get(`http://localhost:3001/api/items/name/${name}`)
    }
}

export const getItemDetails = (id) => {
    return{
        type: 'GET_ITEM_DETAILS',
        payload: Axios.get(`http://localhost:3001/api/items/details/${id}`)
    }
}

export const addItem = (data,header) => {
    return{
        type: 'ADD_ITEM',
        payload: Axios.post('http://localhost:3001/api/items/', data,header)
    }
}

export const editItem = (id, data,header) => {
    return{
        type: 'EDIT_ITEM',
        payload: Axios.put(`http://localhost:3001/api/items/${id}`, data,header)
    }
}

export const deleteItem = (id,header) => {
    return{
        type: 'DELETE_ITEM',
        payload: Axios.delete(`http://localhost:3001/api/items/${id}`, header)
    }
}