import Axios from 'axios';
const url = 'https://quiet-atoll-55962.herokuapp.com';


export const getUserTransactions = (id, header) => {
    return{
        type: 'GET_USER_TRANSACTIONS',
        payload: Axios.get(`${url}/api/transactions/user/${id}`, header)
    }
}

export const getTransactionsByMonth = (month, header) => {
    return{
        type: 'GET_TRANSACTIONS_BYMONTH',
        payload: Axios.get(`${url}/api/transactions/month/${month}`, header)
    }
}

export const newTransaction = (id,data, header) => {
    return{
        type: 'NEW_TRANSACTIONS',
        payload: Axios.post(`${url}/api/transactions/${id}`, data, header)
    }
}
