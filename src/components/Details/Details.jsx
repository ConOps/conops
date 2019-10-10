import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Details.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: "15px"
  }
};

class Details extends Component {
  state = {
    Badge: "None"
  };

  handleChange = event => {
    this.setState({
      Badge: event.target.value
    });
  };

  handleBack = () => {
    this.props.history.push("/check-in");
  };

  handleFind = id => {
    this.props.dispatch({
      type: "FETCH_ORDER_INFO",
      payload: id
    });
    this.props.history.push(`/OrderID`);
  };

  handleDelete = id => {
    this.props.dispatch({
      type: "DELETE_ATTENDEE_INFO",
      payload: id
    });
  };

  handleCheckIn = (id, payment) => {
    if (payment == null) {
      if (window.confirm("get their money!")) {
        if (
          window.confirm("Are you sure that you want to check this person in?")
        ) {
          this.props.dispatch({
            type: "CHECK_IN_AND_PAY_ATTENDEE",
            payload: id
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (
        window.confirm("Are you sure that you want to check this person in?")
      ) {
        this.props.dispatch({
          type: "CHECK_IN_FROM_DETAILS",
          payload: [id]
        });
      }
    }
  };

handleCheckOut =(id, order) => {
    if(order==null){
        if(window.confirm('Are you sure that you want to check this person OUT?')){
            this.props.dispatch({
                type: 'CHECK_OUT_WALK_IN',
                action: id
            })
        }else{
            return false;
        }
    }else{
        if(window.confirm('Are you sure that you want to check this person OUT?')){
            this.props.dispatch({
                type: 'CHECK_OUT',
                action: id
            })
        }else{  
        return false
        }
    }
}

  handleSave = () => {
    alert("Info has been updated");
    this.props.dispatch({
      type: "UPDATE_ATTENDEE_INFO",
      payload: this.props.info
    });
  };

  render() {
    return (
      <div className="detailsPage">
        <div>
          <h1> Manage Attendee: {this.props.info.FirstName}</h1>
          {/* needs to render the name of the attendee */}
          <h1> 2D Con 2020: Remaster</h1>
        </div>
        <div>
          {console.log("info is", this.props.info)}
          {this.props.info.orderID === null && <p>Walk-in</p>}
          {this.props.info.orderID != null && (
            <p>Find All Attendees With Order ID: {this.props.info.orderID} </p>
          )}
          {this.props.info.orderID === null && (
            <Button variant="contained" disabled>
              Find
            </Button>
          )}
          {this.props.info.orderID != null && (
            <Button onClick={() => this.handleFind(this.props.info.orderID)}>
              Find
            </Button>
          )}

          {this.props.info.CheckInDate === null && (
            <Button
              onClick={() =>
                this.handleCheckIn(
                  this.props.info.AttendeeID,
                  this.props.info.PaymentDate
                )
              }
            >
              Check-In
            </Button>
          )}
          {this.props.info.CheckInDate != null && (
              <Button
              onClick={()=>this.handleCheckOut(this.props.info.AttendeeID, this.props.info.orderID)}>Checkout!</Button>
          )}

          {this.props.info.orderID === 4 && (
            <Button onClick={() => this.handleDelete(this.props.info.orderID)}>
              Delete
            </Button>
          )}

          {/*will conditionaly render if there a admin or not */}
        </div>
        <hr></hr>
        <div>
          <h2>Personal Info</h2>
          <TextField
            label="First Name"
            className={this.props.classes.root}
            value={this.props.info.FirstName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_FIRST_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Middle Name"
            className={this.props.classes.root}
            value={this.props.info.MiddleName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_MIDDLE_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Last Name"
            className={this.props.classes.root}
            value={this.props.info.LastName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_LAST_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Street Name 1"
            className={this.props.classes.root}
            value={this.props.info.AddressLineOne}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_ADDRESS_ONE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Street Name 2"
            className={this.props.classes.root}
            value={this.props.info.AddressLineTwo}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_ADDRESS_TWO",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="City"
            className={this.props.classes.root}
            value={this.props.info.City}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_CITY",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="State/Province"
            className={this.props.classes.root}
            value={this.props.info.StateProvince}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_STATE_PROVINCE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Zip/Postal Code"
            className={this.props.classes.root}
            value={this.props.info.PostalCode}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_POSTAL_CODE",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Country"
            className={this.props.classes.root}
            value={this.props.info.CountryID}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_COUNTRY_ID",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Contact Info</h2>
          <TextField
            label="Email Address"
            className={this.props.classes.root}
            value={this.props.info.EmailAddress}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_EMAIL_ADDRESS",
                payload: event.target.value
              })
            }
          ></TextField>
          <TextField
            label="Phone Number"
            className={this.props.classes.root}
            value={this.props.info.PhoneNumber}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_PHONE_NUMBER",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Badge Info</h2>
          <InputLabel>Badge Type</InputLabel>
          <Select
            value={this.state.Badge}
            onChange={event => this.handleChange(event)}
            className={this.props.classes.root}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value="child">Child (6 and under)</MenuItem>
            <MenuItem value="Adult 14">Adult (14 - 20)</MenuItem>
            <MenuItem value="Adult 21">Adult (Over 21)</MenuItem>
          </Select>
          <TextField
            label="Badge Number"
            className={this.props.classes.root}
            value={this.props.info.BadgeNumber}
          ></TextField>
          {/* no handle change or on change, CANT BE EDITED */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Date of Birth"
              className={this.props.classes.root}
              value={this.props.info.DateOfBirth}
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date =>
                this.props.dispatch({
                  type: "EDIT_DETAIL_DATE_OF_BIRTH",
                  payload: date
                })
              }
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Badge Name"
            className={this.props.classes.root}
            value={this.props.info.BadgeName}
            onChange={event =>
              this.props.dispatch({
                type: "EDIT_DETAIL_BADGE_NAME",
                payload: event.target.value
              })
            }
          ></TextField>
        </div>
        <hr></hr>
        <div>
          <h2>Convention Info</h2>
          <h3>2D Con 2020: Remaster</h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                value={this.props.info.RegistrationDate}
                margin="normal"
                id="date-picker-dialog"
                label="Registration Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />{" "}
              {/*No on change this field cannot be edited*/}
              <KeyboardDatePicker
                value={this.props.info.CheckInDate}
                margin="normal"
                id="date-picker-dialog"
                label="Check-In Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                onChange={date =>
                  this.props.dispatch({
                    type: "EDIT_DETAIL_CHECK_IN_DATE",
                    payload: date
                  })
                }
              />
              <KeyboardDatePicker
                value={this.props.info.PaymentDate}
                margin="normal"
                id="date-picker-dialog"
                label="Payment Date"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
                onChange={date =>
                  this.props.dispatch({
                    type: "EDIT_DETAIL_PAYMENT_DATE",
                    payload: date
                  })
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <hr></hr>
        <Button onClick={this.handleBack}>Back</Button>
        <Button onClick={this.handleSave}>Save</Button>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    info: reduxStore.AttendeeDetailsReducer
  };
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(Details))
);
