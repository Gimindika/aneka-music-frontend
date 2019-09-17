const initialState = {
    branch: [],
    isLoading: false,
    isFullfiled: false,
    isRejected: false
  };
  
  const branch = (state = initialState, action) => {
    switch (action.type) {
      //GET_BRANCH/////////////////////////////////////////////////////////
      case "GET_BRANCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "GET_BRANCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_BRANCH_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          branch: action.payload.data.response,
        };

      //ADD_BRANCH///////////////////////////////////////////////////
      case "ADD_BRANCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "ADD_BRANCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "ADD_BRANCH_FULFILLED":
        state.branch.push(action.payload.data.data);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          branch: state.branch,
        };

        //EDIT_BRANCH////////////////////////////////////////////////////////////
      case "EDIT_BRANCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "EDIT_BRANCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "EDIT_BRANCH_FULFILLED":
        const dataAfterEdit = state.branch.map(aBranch => {                    // eslint-disable-next-line
            if(aBranch.id == action.payload.data.data.id){ 
                return action.payload.data.data;
            }
            return aBranch;
        })
        
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          branch: dataAfterEdit
        };
  
      //DELETE_BRANCH////////////////////////////////////////////////////////////
      case "DELETE_BRANCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFullfiled: false
        };
      case "DELETE_BRANCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_BRANCH_FULFILLED":                                             // eslint-disable-next-line
        const dataAfterDelete = state.branch.filter(aBranch => aBranch.id != action.payload.data.data.id);
        return {
          ...state,
          isLoading: false,
          isRejected: false,
          isFullfiled: true,
          branch:dataAfterDelete
        };
  
      default:
        return state;
    }
  };
  
  export default branch;
  