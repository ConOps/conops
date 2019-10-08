const attendeeDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ATTENDEE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}


export default attendeeDetailsReducer;