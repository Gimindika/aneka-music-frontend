import Axios from 'axios';

export const getWishlist = () => {
    return{
        type: 'GET_WISHLIST',
        payload: Axios.get('http://localhost:3001/api/wishlist/')
    }
}

export const addWishlist = (data) => {
    return{
        type: 'ADD_WISHLIST',
        payload: Axios.post('http://localhost:3001/api/wishlist/', data)
    }
}

export const deleteWishlist = (id) => {
    return{
        type: 'DELETE_WISHLIST',
        payload: Axios.delete(`http://localhost:3001/api/wishlist/${id}`)
    }
}