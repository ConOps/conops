const AttendeesOrderIdReducer = (state = [], action) => {
    switch (action.type){
        case 'SET_ORDER_INFO':
            return action.payload
        default:
             return state;
    }
}




export default AttendeesOrderIdReducer;