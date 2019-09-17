import Axios from 'axios';

export const getCart = (id) => {
    return{
        type: 'GET_CART',
        payload: Axios.get(`http://localhost:3001/api/cart/${id}`)
    }
}

export const addCart = (data) => {
    return{
        type: 'ADD_CART',
        payload: Axios.post('http://localhost:3001/api/cart/', data)
    }
}

export const editCart = (id, data) => {
    return{
        type: 'EDIT_CART',
        payload: Axios.put(`http://localhost:3001/api/cart/${id}`, data)
    }
}

export const deleteCart = (id) => {
    return{
        type: 'DELETE_CART',
        payload: Axios.delete(`http://localhost:3001/api/cart/${id}`)
    }
}

export const clearCart = (id) => {
    return{
        type: 'CLEAR_CART',
        payload: Axios.delete(`http://localhost:3001/api/cart/clear/${id}`)
    }
}