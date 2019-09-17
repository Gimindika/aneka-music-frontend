const initialState = {
    user: {},
    token: {},
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
  
      //LOGIN///////////////////////////////////////////////////
      case "LOGIN_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "LOGIN_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "LOGIN_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          user: action.payload.data.data.user,
          token: action.payload.data.data.token
        };
  
      default:
        return state;
    }
  };
  
  export default user;
  