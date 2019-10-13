import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDetails(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //logging to make sure we're getting ID from click
        // yield console.log('in fetchDetails:', action.payload);
        const response = yield axios.get(`/api/event/eventdetails/${action.payload}`, config);
        yield put({
            type: 'SET_EVENT_DETAILS',
            payload: response.data
        })

    } catch (err) {
        console.log('error in fetch event details saga', err);
    }
}

function* uncancelEvent(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.put(`/api/event/event_uncancel`, {eventToUncancel: action.payload}, config);
        yield put({
            type: 'FETCH_EVENT_DETAILS',
            payload: action.payload
        })
        yield put({
            type: 'FETCH_EVENT_LIST'
        })
    } catch (err) {
        console.log('error in uncancel event saga', err);
    }
}

function* cancelEvent(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.put(`/api/event/event_cancel`, { eventToUncancel: action.payload }, config);
        yield put({
            type: 'FETCH_EVENT_DETAILS',
            payload: action.payload
        })
        yield put({
            type: 'FETCH_EVENT_LIST'
        })
    } catch (err) {
        console.log('error in uncancel event saga', err);
    }
}

function* eventDetailsSaga() {
    yield takeLatest('FETCH_EVENT_DETAILS', fetchDetails);
    yield takeLatest('UNCANCEL_EVENT', uncancelEvent);
    yield takeLatest('CANCEL_EVENT', cancelEvent);
}

export default eventDetailsSaga;