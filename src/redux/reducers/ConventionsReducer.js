

const conventionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONVENTION_INFO':
            return action.payload
        default:
            return state;
    }
}


export default conventionsReducer;