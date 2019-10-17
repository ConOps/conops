const eventDetailsReducer = (state = { Tags: [], TagObjects: [], LocationName: '', EventName: '', EventStartTime: '08/20/2014', EventEndTime: '08/20/2014', SponsorID: '', LocationID: '', EventModifiedNotes: ''}, action) => {
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
        case 'CREATE_EVENT_START_TIME':
            return { ...state, EventStartTime: action.payload }
        case 'CREATE_EVENT_END_TIME':
            return { ...state, EventEndTime: action.payload }
        case 'CREATE_EVENT_DESCRIPTION':
            return { ...state, EventDescription: action.payload}
        case 'CREATE_EVENT_LOCATION':
            return { ...state, LocationName: action.payload }
        case 'CREATE_EVENT_TAGS':
            return { ...state, TagName: action.payload }
        case 'EDIT_EVENT_TAGS':
            return { ...state, TagObjects: [...state.TagObjects, action.payload]}
        case 'EDIT_EVENT_LOCATION':
            return { ...state, LocationID: action.payload}
        case 'EDIT_EVENT_SPONSOR':
            return { ...state, SponsorID: action.payload}
        case 'EDIT_EVENT_MODIFIED_NOTES':
            return { ...state, EventModifiedNotes: action.payload}
        case 'REMOVE_TAG_FROM_EVENT':
            const newTagObjects = state.TagObjects;
            for (let i = 0; i < newTagObjects.length; i++) {
                if (action.payload === state.TagObjects[i]) {
                    newTagObjects.splice(i, 1)
                }
            }
            return { ...state, TagObjects: newTagObjects }
        case 'CLEAR_EVENT_DETAILS':
            return { Tags: [], TagObjects: [], LocationName: '', EventName: '', EventStartTime: '08/20/2014', EventEndTime: '08/20/2014', SponsorID: '', LocationID: '', EventModifiedNotes: '' }
        default:
            return state;
    }
}


export default eventDetailsReducer;