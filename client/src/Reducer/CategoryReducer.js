const initCategory = {
    categories: [],
    isLoading: false,
}

const CategoryReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_INIT":
          return {
            ...state,
            isLoading: true,
        
          };
        case "FETCH_SUCCESS":
          return {
            ...state,
            isLoading: false,
            categories: action.payload
          };
        case "FETCH_FAILURE":
          return {
            ...state,
            isLoading: false,
          };
        default:
          throw new Error('Invalid Action');
      }
}


export {initCategory};
export default CategoryReducer;
