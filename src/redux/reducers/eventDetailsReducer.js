const eventDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload;
        case 'EDIT_EVENT_NAME':
            return { ...state, EventName: action.payload}
        default:
            return state;
    }
}


export default eventDetailsReducer;