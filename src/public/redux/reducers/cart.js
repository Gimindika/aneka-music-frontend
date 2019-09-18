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
        const data = [];
        action.payload.data.response.map((item, index) => {
          if(index < action.payload.data.response.length){
            data.push(item);
          }
          return null;
        })
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          cart: data,
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
            if(item.id == action.payload.data.data.id && item.branch == action.payload.data.data.branch){
                return {
                  ...item,
                  quantity: action.payload.data.data.quantity
                } 
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
      case "DELETE_CART_FULFILLED":                          
        const dataAfterDelete = []; 
        state.cart.map(item => {                    // eslint-disable-next-line
          if(!(item.itemID == action.payload.data.data.item && item.branchID == action.payload.data.data.branch)){
            dataAfterDelete.push(item)
          }
          return null
        })
      
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
  