import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
// import AttendeeDetailsSaga from './AttendeeDetailsSaga';
// import AttendeesCheckInSaga from './AttendeesCheckInSaga';
// import AttendeesOrderIdSaga from './AttendeesOrderIdSaga';
// import ConventionSaga from './ConventionSaga';
// import EventsSaga from './EventsSaga';
// import HomePageSaga from './HomePageSaga';
// import LocationSaga from './LocationSaga';
// import TagsSaga from './TagsSaga'
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    // AttendeeDetailsSaga(),
    // AttendeesCheckInSaga(),
    // AttendeesOrderIdSaga(),
    // ConventionSaga(),
    // EventsSaga(),
    // HomePageSaga(),
    // LocationSaga(),
    // TagsSaga()
  ]);
}
