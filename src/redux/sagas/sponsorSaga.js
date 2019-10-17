import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSponsors() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/sponsor`, config)
        yield put({ type: 'SET_SPONSORS', payload: response.data })
    } catch (error) {
        console.log('error in fetchSponsor saga:', error)
    }
}

function* addSponsor(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
    };
    yield axios.post(`/api/sponsor`, action.payload, config)
    yield put({type: 'FETCH_SPONSORS'})
    } catch (error) {
        console.log('error in addSponsor saga:', error)
    }
}



function* sponsorSaga() {
    yield takeLatest('FETCH_SPONSORS', fetchSponsors)
    yield takeLatest('ADD_SPONSOR', addSponsor)
}

export default sponsorSaga;