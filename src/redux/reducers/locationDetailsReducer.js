const locationDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOCATION_DETAILS':
            return action.payload;
        case 'EDIT_LOCATION_NAME':
            return { ...state, LocationName: action.payload };
        case 'EDIT_LOCATION_DESCRIPTION':
            return { ...state, LocationDescription: action.payload };
        default:
            return state;
    }
}


export default locationDetailsReducer;