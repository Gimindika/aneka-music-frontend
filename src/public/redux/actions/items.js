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

export const addItem = (data) => {
    return{
        type: 'ADD_ITEM',
        payload: Axios.post('http://localhost:3001/api/items/', data)
    }
}

export const editItem = (id, data) => {
    return{
        type: 'EDIT_ITEM',
        payload: Axios.put(`http://localhost:3001/api/items/${id}`, data)
    }
}

export const deleteItem = (id) => {
    return{
        type: 'DELETE_ITEM',
        payload: Axios.delete(`http://localhost:3001/api/items/${id}`)
    }
}