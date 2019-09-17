const initialState = {
    userTransactions: [],
    transactionsByMonth: [], 
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const transactions = (state = initialState, action) => {
    switch (action.type) {
      //GET_USER_TRANSACTIONS/////////////////////////////////////////////////////////
      case "GET_USER_TRANSACTIONS_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_USER_TRANSACTIONS_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_USER_TRANSACTIONS_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          userTransactions: action.payload.data.response,
        };

      //GET_TRANSACTIONS_BYMONTH/////////////////////////////////////////////////////////
      case "GET_TRANSACTIONS_BYMONTH_PENDING":
            return {
              ...state,
              isLoading: true,
              isRejected: false,
              isFullfiled: false
            };
          case "GET_TRANSACTIONS_BYMONTH_REJECTED":
            return {
              ...state,
              isLoading: false,
              isRejected: true
            };
          case "GET_TRANSACTIONS_BYMONTH_FULFILLED":
            return {
              ...state,
              isLoading: false,
              isRejected: false,
              isFullfiled: true,
              transactionsByMonth: action.payload.data.response,
            };
  
      //NEW_TRANSACTIONS///////////////////////////////////////////////////
      case "NEW_TRANSACTIONS_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "NEW_TRANSACTIONS_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "NEW_TRANSACTIONS_FULFILLED":
        state.userTransactions.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          userTransactions: state.userTransactions,
        };
  
      default:
        return state;
    }
  };
  
  export default transactions;
  