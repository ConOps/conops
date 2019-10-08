import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAttendeePersonalInfo(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //logging to make sure we're getting ID from click
        yield console.log('in fetchAttendeePersonalInfo:', action.payload);
        const response = yield axios.get(`/api/attendee/details/${action.payload}`, config);
        yield put({
            type: 'SET_ATTENDEE_DETAILS',
            payload: response.data
        })

    } catch(err) {
        console.log('error in fetchAttendeeDetails saga', err);
    }
}


function* attendeeDetailsSaga() {
    yield takeLatest('FETCH_ATTENDEE_PERSONAL_INFO', fetchAttendeePersonalInfo)
}

export default attendeeDetailsSaga;