const sponsorDetailsReducer = (state = { SponsorIsActive: true }, action) => {
    switch (action.type) {
        case 'SET_SPONSOR_DETAILS':
            return action.payload;
        case 'EDIT_SPONSOR_NAME':
            return { ...state, SponsorName: action.payload };
        case 'EDIT_SPONSOR_AMOUNT_PAID':
            return { ...state, AmountPaid: action.payload };
        case 'EDIT_SPONSOR_WEBSITE':
            return { ...state, Website: action.payload };
        case 'EDIT_SPONSOR_NOTES':
            return { ...state, Notes: action.payload };
        case 'EDIT_SPONSOR_STATUS':
            return { ...state, SponsorIsActive: action.payload };
        default:
            return state;
    }
}

export default sponsorDetailsReducer;