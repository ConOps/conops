import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * fetchOrderInfo(){  // find all the personal information of all attendees that share the same orderID
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
    };
    const response = yield axios.get(`/api/attendee/order`, {orderID: action.payload});
        yield put({ type: 'SET_ORDER_INFO', payload: response.data})
    }catch(error){
    console.log('error in fetchOrderInfo', error);
    }
}

function * attendeesOrderIdSaga(){
    yield takeLatest('FETCH_ORDER_INFO', fetchOrderInfo)
}
export default attendeesOrderIdSaga;