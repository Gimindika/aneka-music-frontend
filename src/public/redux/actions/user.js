import Axios from 'axios';
const url = 'https://quiet-atoll-55962.herokuapp.com';


export const login = (data) => {
    return{
        type: 'LOGIN',
        payload: Axios.post(`${url}/api/user/login`, data)
    }
}

export const register = (data) => {
    return{
        type: 'REGISTER',
        payload: Axios.post(`${url}/api/user/register`, data)
    }
}