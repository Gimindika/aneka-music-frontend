const initialState = {
    items: [],
    itemDetails: {},
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const items = (state = initialState, action) => {
    switch (action.type) {
      //GET_ITEMS_BYCATEGORY/////////////////////////////////////////////////////////
      case "GET_ITEMS_BYCATEGORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_ITEMS_BYCATEGORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_ITEMS_BYCATEGORY_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          items: action.payload.data.response,
        };

        //GET_ITEMS_BYBRANCH/////////////////////////////////////////////////////////
      case "GET_ITEMS_BYBRANCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_ITEMS_BYBRANCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_ITEMS_BYBRANCH_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          items: action.payload.data.response,
        };

        //GET_ITEMS_BYNAME/////////////////////////////////////////////////////////
      case "GET_ITEMS_BYNAME_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_ITEMS_BYNAME_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_ITEMS_BYNAME_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          items: action.payload.data.response,
        };

        //GET_ITEM_DETAILS/////////////////////////////////////////////////////////
      case "GET_ITEM_DETAILS_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_ITEM_DETAILS_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_ITEM_DETAILS_FULFILLED":
       
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          itemDetails: action.payload.data.response,
        };
  
      //ADD_ITEM///////////////////////////////////////////////////
      case "ADD_ITEM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "ADD_ITEM_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "ADD_ITEM_FULFILLED":
        // state.items.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          items: state.items,
        };

        //EDIT_ITEM////////////////////////////////////////////////////////////
      case "EDIT_ITEM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "EDIT_ITEM_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "EDIT_ITEM_FULFILLED":
        const dataAfterEdit =  action.payload.data.data;
        
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          itemDetails: dataAfterEdit
        };
  
      //DELETE_ITEM////////////////////////////////////////////////////////////
      case "DELETE_ITEM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "DELETE_ITEM_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_ITEM_FULFILLED":               
      console.log(action.payload.data.data);
      
                                    // eslint-disable-next-line
        const dataAfterDelete = state.items.filter(item => item.id != action.payload.data.data.id);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          items:dataAfterDelete
        };
  
      default:
        return state;
    }
  };
  
  export default items;
  