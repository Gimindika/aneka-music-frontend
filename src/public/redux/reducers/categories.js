const initialState = {
    categories: [],
    displayCategories: true,
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const categories = (state = initialState, action) => {
    switch (action.type) {
      //GET_CATEGORIES/////////////////////////////////////////////////////////
      case "GET_CATEGORIES_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_CATEGORIES_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_CATEGORIES_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          categories: action.payload.data.response,
        };
  
      //ADD_CATEGORY///////////////////////////////////////////////////
      case "ADD_CATEGORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "ADD_CATEGORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "ADD_CATEGORY_FULFILLED":
        state.categories.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          categories: state.categories,
        };

        //EDIT_CATEGORY////////////////////////////////////////////////////////////
      case "EDIT_CATEGORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "EDIT_CATEGORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "EDIT_CATEGORY_FULFILLED":
        const dataAfterEdit = state.categories.map(category => {                    // eslint-disable-next-line
            if(category.id == action.payload.data.data.id){ 
                return action.payload.data.data;
            }
            return category;
        })
        
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          categories: dataAfterEdit
        };
  
      //DELETE_CATEGORY////////////////////////////////////////////////////////////
      case "DELETE_CATEGORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "DELETE_CATEGORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_CATEGORY_FULFILLED":                                             // eslint-disable-next-line
        const dataAfterDelete = state.categories.filter(category => category.id != action.payload.data.data.id);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          categories:dataAfterDelete
        };
  
        //SET_DISPLAY/////////////////////////////////////////////////////////
      case "SET_DISPLAY":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          displayCategories: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default categories;
  