const initialState = {
    wishlist: [],
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const wishlist = (state = initialState, action) => {
    switch (action.type) {
      //GET_WISHLIST/////////////////////////////////////////////////////////
      case "GET_WISHLIST_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_WISHLIST_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_WISHLIST_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          wishlist: action.payload.data.response,
        };
  
      //ADD_WISHLIST///////////////////////////////////////////////////
      case "ADD_WISHLIST_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "ADD_WISHLIST_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "ADD_WISHLIST_FULFILLED":
        state.wishlist.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          wishlist: state.wishlist,
        };

      //DELETE_WISHLIST////////////////////////////////////////////////////////////
      case "DELETE_WISHLIST_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "DELETE_WISHLIST_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_WISHLIST_FULFILLED":                                             // eslint-disable-next-line
        const dataAfterDelete = state.wishlist.filter(item => item.id != action.payload.data.data.id);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          wishlist:dataAfterDelete
        };
  
      default:
        return state;
    }
  };
  
  export default wishlist;
  