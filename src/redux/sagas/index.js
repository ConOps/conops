import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
// import AttendeeDetailsSaga from './attendeeDetailsSaga';
// import AttendeesCheckInSaga from './attendeesCheckInSaga';
// import AttendeesOrderIdSaga from './attendeesOrderIdSaga';
// import ConventionSaga from './conventionSaga';
// import EventsSaga from './eventsSaga';
// import HomePageSaga from './homePageSaga';
// import LocationSaga from './locationSaga';
// import TagsSaga from './tagsSaga';
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
