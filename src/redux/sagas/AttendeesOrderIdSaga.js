import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * fetchOrderInfo(action){  // find all the personal information of all attendees that share the same orderID
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
    };
    const response = yield axios.get(`/api/attendee/order/${action.payload}`, config);
        yield put({ type: 'SET_ORDER_INFO', payload: response.data})
    }catch(error){
    console.log('error in fetchOrderInfo', error);
    }
}

function * oneCheckInToRuleThemAll(action){
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action.payload);
         yield axios.put('/api/attendee/checkIn', {attendeesToCheckIn: action.payload}, config)
         yield put ({
             type: 'FETCH_ALL_ATTENDEES',
         })
    }catch(error){
        console.log('error in onCheckInToRuleThemAll', error);     
    }
}

function * checkInAndPay(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.put('/api/attendee/checkInAndPay', {attendeesToCheckIn: action.payload}, config)
        yield put ({
            type: 'FETCH_ALL_ATTENDEES'
        })
}catch(error){
console.log('error in checkInAndPay', error);
}
}

function * attendeesOrderIdSaga(){
    yield takeLatest('FETCH_ORDER_INFO', fetchOrderInfo)
    yield takeLatest('CHECK_IN_ALL_SELECTED', oneCheckInToRuleThemAll)
    yield takeLatest('CHECK_IN_AND_PAY_ATTENDEE', checkInAndPay)
}

export default attendeesOrderIdSaga;