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

function* fetchTagDetails(action) {  //this will give the Tag reducer the details for the specific tag
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/tag/details/${action.payload}`, config)
        yield put({ type: 'SET_TAG', payload: response.data })
    } catch (error) {
        console.log('error in fetchTagDetails', error);
    }
}


// function* deleteTagInfo(action) {
//     try {
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true,
//         };
//         yield axios.delete(`api/tag/delete/${action.payload}`, config);
//         yield put({
//             type: 'FETCH_TAG_LIST'
//         })

//     } catch (error) {
//         console.log('error in deleteAttendeeInfo', error);

//     }
// }

function* TagsSaga() {
    yield takeLatest('FETCH_TAG_LIST', fetchTagsInfo)
    // yield takeLatest('DELETE_TAG_INFO', deleteTagInfo)
    yield takeLatest('FETCH_TAG_INFO', fetchTagDetails)
}





export default TagsSaga;