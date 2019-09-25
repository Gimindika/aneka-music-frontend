import Axios from 'axios';
const url = 'https://quiet-atoll-55962.herokuapp.com';

export const getCart = (id, header) => {
    return{
        type: 'GET_CART',
        payload: Axios.get(`${url}/api/cart/${id}`,header)
    }
}

export const addCart = (id,data,header) => {
  
    return{
        type: 'ADD_CART',
        payload: Axios.post(`${url}/api/cart/${id}`, data,header)
    }
}

export const editCart = (id, data,header) => {
    return{
        type: 'EDIT_CART',
        payload: Axios.put(`${url}/api/cart/${id}`, data,header)
    }
}

export const deleteCart = (id, itemID, branchID,header) => {
    return{
        type: 'DELETE_CART',
        payload: Axios.delete(`${url}/api/cart/${id}/${itemID}/${branchID}`,header)
    }
}

export const clearCart = (id,header) => {
    return{
        type: 'CLEAR_CART',
        payload: Axios.delete(`${url}/api/cart/clear/${id}`,header)
    }
}