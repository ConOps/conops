import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
// import AttendeeDetails from './attendeeDetailsReducer';
// import AttendeesCheckIn from './attendeesCheckInReducer';
// import AttendeesOrderId from './attendeesOrderIdReducer';
// import Conventions from './conventionsReducer';
// import Events from './eventsReducer';
// import HomePage from './homePageReducer';
// import Tags from './tagsReducer';
// import Location from './locationReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  // AttendeeDetails,
  // AttendeesCheckIn,
  // AttendeesOrderId,
  // Conventions,
  // Events,
  // HomePage,
  // Tags,
  // Location
});

export default rootReducer;
