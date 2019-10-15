import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * fetchNews(){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/home/', config)
        yield put({
            type: 'SET_NEWS',
            payload: response.data
        })
}catch(error){
    console.log('error in fetchNews', error);
    
}
}
function * homePageSaga(){
    yield takeLatest('FETCH_NEWS', fetchNews)
}

export default homePageSaga;