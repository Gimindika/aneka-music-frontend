import Axios from 'axios';

export const getUserTransactions = (id, header) => {
    return{
        type: 'GET_USER_TRANSACTIONS',
        payload: Axios.get(`http://localhost:3001/api/transactions/user/${id}`, header)
    }
}

export const getTransactionsByMonth = (month, header) => {
    return{
        type: 'GET_TRANSACTIONS_BYMONTH',
        payload: Axios.get(`http://localhost:3001/api/transactions/month/${month}`, header)
    }
}

export const newTransaction = (id,data, header) => {
    return{
        type: 'NEW_TRANSACTIONS',
        payload: Axios.post(`http://localhost:3001/api/transactions/${id}`, data, header)
    }
}
