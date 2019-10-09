import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTagsInfo() {  //this will give the Tag reducer all of the tag info
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/tag`, config)
        yield put({ type: 'SET_TAG_LIST', payload: response.data })
    } catch (error) {
        console.log('error in fetchTagsInfo', error);
    }
}

function* TagsSaga() {
    yield takeLatest('FETCH_TAG_LIST', fetchTagsInfo)
}





export default TagsSaga;