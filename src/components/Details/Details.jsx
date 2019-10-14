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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const styles = {
  root: {
    margin: "15px"
  }
};

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class Details extends Component {
  state = {
    Badge: "None",
    openDelete: false,
    id: {},
  };

  componentDidMount() {
    this.fetchAttendeeInformation();
  }

  handleClickOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };


  deleteAttendee = () => {
    this.props.dispatch({
      type: "DELETE_ATTENDEE_INFO",
      payload: this.state.id
    });
    this.props.history.push(`/check-in`)
  }

  fetchAttendeeInformation = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'FETCH_ATTENDEE_PERSONAL_INFO',
      payload: id
    });

  }

  handleChange = event => {
    this.setState({
      Badge: event.target.value
    });
  };

  handleBack = () => {
    this.props.history.push("/check-in");
  };

  handleFind = id => {
    // this.props.dispatch({
    //   type: "FETCH_ORDER_INFO",
    //   payload: id
    // });
    this.props.history.push(`/OrderID/${id}`);
  };

  handleDelete = id => {
    this.setState({
      openDelete: !this.state.openDelete,
      ...this.state.id, id: id
    })
    // if(window.confirm('are you sure that you would like to delete this attendee??'))
   
  
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

  handleCheckOut = (id, order) => {
    if (order == null) {
      if (
        window.confirm("Are you sure that you want to check this person OUT?")
      ) {
        this.props.dispatch({
          type: "CHECK_OUT_WALK_IN",
          payload: id
        });
      } else {
        return false;
      }
    } else {
      if (
        window.confirm("Are you sure that you want to check this person OUT?")
      ) {
        this.props.dispatch({
          type: "CHECK_OUT",
          payload: id
        });
      } else {
        return false;
      }
    }
  };

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
        <Dialog
          open={this.state.openDelete}
          onClose={this.handleCloseDelete}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Delete Attendee?
        </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure that you would like to delete this attendee?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Cancel
          </Button>
            <Button onClick={this.deleteAttendee} color="primary">
              Confirm
          </Button>
          </DialogActions>
        </Dialog>
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleFind(this.props.info.orderID)}
            >
              Find
            </Button>
          )}

          {(this.props.user.authorization === 4 || this.props.user.authorization === 1 ) && (this.props.info.CheckInDate === null ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.handleCheckIn(
                  this.props.info.AttendeeID,
                  this.props.info.PaymentDate
                )
              }
            >
              Check-In
            </Button>
          )
          :
          (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                this.handleCheckOut(
                  this.props.info.AttendeeID,
                  this.props.info.orderID
                )
              }
            >
              Checkout!
            </Button>
          ))}

          {this.props.user.authorization === 4 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleDelete(this.props.info.AttendeeID)}
            >
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
            InputLabelProps={{ shrink: this.props.info.FirstName}}
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
            InputLabelProps={{ shrink: this.props.info.MiddleName }}
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
            InputLabelProps={{ shrink: this.props.info.LastName }}
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
            InputLabelProps={{ shrink: this.props.info.AddressLineOne }}
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
            InputLabelProps={{ shrink: this.props.info.AddressLineTwo }}
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
            InputLabelProps={{ shrink: this.props.info.City }}
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
            InputLabelProps={{ shrink: this.props.info.StateProvince}}
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
            InputLabelProps={{ shrink: this.props.info.PostalCode}}
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
            InputLabelProps={{ shrink: this.props.info.CountryID }}
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
            InputLabelProps={{ shrink: this.props.info.EmailAddress}}
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
            InputLabelProps={{ shrink: this.props.info.PhoneNumber }}
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
            <MenuItem value="YoungChild">Child (6 and under)</MenuItem>
            <MenuItem value="Child">Child (7 - 13)</MenuItem>
            <MenuItem value="Adult 14">Adult (14 - 20)</MenuItem>
            <MenuItem value="Adult 21">Adult (Over 21)</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Independent Developer">Independent Developer</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Sponsor">Sponsor</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="VIP">V.I.P.</MenuItem>
            <MenuItem value="Vendor">Vendor</MenuItem>
            <MenuItem value="Unidentified">Unidentified - identify DoB</MenuItem>
          </Select>
          <TextField
            label="Badge Number"
            className={this.props.classes.root}
            InputLabelProps={{ shrink: this.props.info.BadgeNumber }}
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
            InputLabelProps={{ shrink: this.props.info.BadgeName}}
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
        <Button variant="contained" color="primary" onClick={this.handleBack}>
          Back
        </Button>
        {(this.props.user.authorization === 4 || this.props.user.authorization === 1)
        &&(
        <Button variant="contained" color="primary" onClick={this.handleSave}>
          Save
        </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    info: reduxStore.AttendeeDetailsReducer,
    user: reduxStore.user
  };
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(Details))
);
