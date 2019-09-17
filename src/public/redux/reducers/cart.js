const initialState = {
    cart: [],
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const cart = (state = initialState, action) => {
    switch (action.type) {
      //GET_CART/////////////////////////////////////////////////////////
      case "GET_CART_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_CART_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_CART_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart: action.payload.data.response,
        };
  
      //ADD_CART///////////////////////////////////////////////////
      case "ADD_CART_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "ADD_CART_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "ADD_CART_FULFILLED":
        state.cart.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart: state.cart,
        };

        //EDIT_CART////////////////////////////////////////////////////////////
      case "EDIT_CART_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "EDIT_CART_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "EDIT_CART_FULFILLED":
        const dataAfterEdit = state.cart.map(item => {                    // eslint-disable-next-line
            if(item.id == action.payload.data.data.id){ 
                return action.payload.data.data;
            }
            return item;
        })
        
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart: dataAfterEdit
        };
  
      //DELETE_CART////////////////////////////////////////////////////////////
      case "DELETE_CART_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "DELETE_CART_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_CART_FULFILLED":                                             // eslint-disable-next-line
        const dataAfterDelete = state.cart.filter(item => item.id != action.payload.data.data.id);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart:dataAfterDelete
        };

      //CLEAR_CART////////////////////////////////////////////////////////////
      case "CLEAR_CART_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "CLEAR_CART_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "CLEAR_CART_FULFILLED":                            
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart:[]
        };
  
      default:
        return state;
    }
  };
  
  export default cart;
  