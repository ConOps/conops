const TagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAG_LIST':
            return action.payload;
        // case 'SET_TAG':
        //     return action.payload;
        // case 'UPDATE_PROPERTY':
        //     return {
        //         ...state,
        //         [action.payload.key]: action.payload.newValue,
        //     };
        default:
            return state;
    }
}



export default TagsReducer;