import Axios from 'axios';

export const getWishlist = (id) => {
    return{
        type: 'GET_WISHLIST',
        payload: Axios.get(`http://localhost:3001/api/wishlist/${id}`)
    }
}

export const addWishlist = (user, item) => {
    return{
        type: 'ADD_WISHLIST',
        payload: Axios.post(`http://localhost:3001/api/wishlist/${user}/${item}`)
    }
}

export const deleteWishlist = (user, item) => {
    return{
        type: 'DELETE_WISHLIST',
        payload: Axios.delete(`http://localhost:3001/api/wishlist/${user}/${item}`)
    }
}