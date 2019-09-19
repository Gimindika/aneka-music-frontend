import Axios from 'axios';

export const getCart = (id, header) => {
    return{
        type: 'GET_CART',
        payload: Axios.get(`http://localhost:3001/api/cart/${id}`,header)
    }
}

export const addCart = (id,data,header) => {
  
    return{
        type: 'ADD_CART',
        payload: Axios.post(`http://localhost:3001/api/cart/${id}`, data,header)
    }
}

export const editCart = (id, data,header) => {
    return{
        type: 'EDIT_CART',
        payload: Axios.put(`http://localhost:3001/api/cart/${id}`, data,header)
    }
}

export const deleteCart = (id, itemID, branchID,header) => {
    return{
        type: 'DELETE_CART',
        payload: Axios.delete(`http://localhost:3001/api/cart/${id}/${itemID}/${branchID}`,header)
    }
}

export const clearCart = (id,header) => {
    return{
        type: 'CLEAR_CART',
        payload: Axios.delete(`http://localhost:3001/api/cart/clear/${id}`,header)
    }
}