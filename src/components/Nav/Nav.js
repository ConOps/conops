import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">ConOps Logo</h2>
    </Link>
    <div className="nav-right">
      
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Button
            className="attendees"
          >
            Attendees
                 </Button>
          <Menu>
          <MenuItem
          className="check-in"
          component={Link}
          to="/AtteneeCheckIn">
          Check-In
          {/* <Link className="nav-link" to="/AttendeeCheckIn">
            Attendee Check-In
          </Link> */}
          </MenuItem>
          <MenuItem><Link className="nav-link" to="/info">
            Info Page
          </Link></MenuItem>
          </Menu>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
