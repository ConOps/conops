import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLocations() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
    const response = yield axios.get(`/api/location`, config)
        yield put ({ type:  'SET_LOCATIONS', payload: response.data  })
    } catch  (error) {
    console.log('error in fetchLocations saga:', error)
    }
}

function* locationSaga() {
    yield takeLatest('FETCH_LOCATIONS', fetchLocations)
}

export default locationSaga;