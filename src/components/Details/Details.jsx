import React, { Component }from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import './Details.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';


const styles = ({
    root: {
        margin: '15px',
    },
});



class Details extends Component {

    state={
        Badge: "None",
    }


    handleChange = (event) => {
        this.setState({
            Badge: event.target.value
        })
    } 

    handleBack = () => {
        this.props.history.push('/check-in')
    }

    handleFind = (id) => {
        this.props.dispatch({
            type: 'FETCH_ORDER_INFO',
            payload: id
        })
        this.props.history.push(`/OrderID`)
    }

    

    render(){
        return(
            <div className="detailsPage">
                <div>
                <h1>  Manage Attendee: {this.props.info.FirstName}</h1>{/* needs to render the name of the attendee */}
                <h1> 2D Con 2020: Remaster</h1>
                </div>
                <div>
                    <p>Find All Attendees With Order ID: {this.props.info.orderID} </p> 
                    <Button onClick={() => this.handleFind(this.props.info.orderID)}>Find</Button>
                        <Button>Check-In</Button>
                        <Button>Delete</Button> {/*will conditionaly render if there a admin or not */}
                </div>
                <hr></hr>
                <div>
                <h2>Personal Info</h2>
                    <TextField label="First Name" className={this.props.classes.root} value={this.props.info.FirstName}></TextField>
                    <TextField label="Middle Name" className={this.props.classes.root} value={this.props.info.MiddleName}></TextField>
                    <TextField label="Last Name" className={this.props.classes.root} value={this.props.info.LastName}></TextField>
                    <TextField label="Street Name 1" className={this.props.classes.root} value={this.props.info.AddressLineOne}></TextField>
                    <TextField label="Street Name 2" className={this.props.classes.root} value={this.props.info.AddressLineTwo}></TextField>
                    <TextField label="City" className={this.props.classes.root} value={this.props.info.City}></TextField>
                    <TextField label="State/Province" className={this.props.classes.root} value={this.props.info.StateProvince}></TextField>
                    <TextField label="Zip/Postal Code" className={this.props.classes.root} value={this.props.info.PostalCode}></TextField>
                    <TextField label="United States" className={this.props.classes.root} value={this.props.info.CountryID}></TextField>
                </div>
                <hr></hr>
                <div>
                <h2>Contact Info</h2>
                    <TextField label="Email Address" className={this.props.classes.root} value={this.props.info.EmailAddress}></TextField>
                    <TextField label="Phone Number" className={this.props.classes.root} value={this.props.info.PhoneNumber}></TextField>
                </div>
                <hr></hr>
                <div>
                <h2>Badge Info</h2>
                <InputLabel>Badge Type</InputLabel>
                <Select
                    value={this.state.Badge}
                    onChange={(event) => this.handleChange(event)}
                        className={this.props.classes.root}
                >
                    <MenuItem value="None">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value="child">Child (6 and under)</MenuItem>
                        <MenuItem value="Adult 14">Adult (14 - 20)</MenuItem>
                        <MenuItem value="Adult 21">Adult (Over 21)</MenuItem>
                </Select>
                    <TextField label="Badge Number" className={this.props.classes.root} value={this.props.info.BadgeNumber}></TextField>{/* no handle change or on change, CANT BE EDITED */}
                    <TextField label="Date of Birth" className={this.props.classes.root} value={this.props.info.DateOfBirth}></TextField>
                    <TextField label="Badge Name" className={this.props.classes.root} value={this.props.info.BadgeName}></TextField>
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
                                    'aria-label': 'change date',
                                }}
                            /> {/*No on change this field cannot be edited*/}
                            <KeyboardDatePicker
                                value={this.props.info.CheckInDate}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Check-In Date"
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                value={this.props.info.PaymentDate}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Payment Date"
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <hr></hr>
                <Button onClick={this.handleBack}>Back</Button>
                <Button>Save</Button>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        info: reduxStore.AttendeeDetailsReducer
    };
};


export default withStyles(styles)(withRouter(connect(mapStateToProps)(Details)));
