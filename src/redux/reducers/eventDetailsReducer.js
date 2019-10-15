const eventDetailsReducer = (state = {Tags: [], TagIDs: [], LocationName: '', EventName: '', EventStartTime: '', EventEndTime: '', }, action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            
            return action.payload;
        case 'EDIT_EVENT_NAME':
            return { ...state, EventName: action.payload}
        case 'EDIT_EVENT_START_TIME':
            return { ...state, EventStartTime: action.payload}
        case 'EDIT_EVENT_END_TIME':
            return { ...state, EventEndTime: action.payload}
        case 'EDIT_EVENT_DESCRIPTION':
            return { ...state, EventDescription: action.payload}
        case 'CREATE_EVENT_NAME':
            return { ...state, EventName: action.payload}
        case 'CREATE_EVENT_DESCRIPTION':
            return { ...state, EventDescription: action.payload}
        case 'EDIT_EVENT_TAGS':
            return { ...state, Tags: [... action.payload]}
        case 'EDIT_EVENT_LOCATION':
            return { ...state, LocationID: action.payload}
        case 'EDIT_EVENT_SPONSOR':
            return { ...state, SponsorID: action.payload}
        default:
            return state;
    }
}


export default eventDetailsReducer;