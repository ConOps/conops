import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

class Conventions extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONVENTION"
    });
  }

  handleConventionName = event => {
    this.setState({
      ConventionName: event.target.value
    });
  };

  conventionStartDate = date => {
    this.setState({
      ConventionStartTime: date
    });
  };

  conventionEndDate = date => {
    this.setState({
      ConventionEndTime: date
    });
  };

  newConvention = () => {
    console.log("convention state", this.state);

    this.props.dispatch({
      type: "ADD_NEW_CONVENTION",
      payload: this.state
    });
  };

  updateName = event => {
    this.props.dispatch({
      type: "UPDATE_NAME",
      payload: event.target.value
    });
  };

  updateStartTime = date => {
    this.props.dispatch({
      type: "UPDATE_START_TIME",
      payload: date
    });
  };

  updateEndTime = date => {
    this.props.dispatch({
      type: "UPDATE_END_TIME",
      payload: date
    });
  };

  editConvention = () => {
    this.props.dispatch({
      type: "UPDATE_CONVENTION",
      payload: this.props.info
    });
  };

  render() {
    return (
      <div style={{ marginTop: '65px' }}>
        <h1>The Active Convention is: </h1>
        <hr></hr>
        <h3>Create New Convention:</h3>
        <TextField
          id="standard-full-width"
          label="New Convention Name:"
          style={{ margin: 8 }}
          placeholder="Convention Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={event => this.handleConventionName(event)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              value={this.state.ConventionStartTime}
              margin="normal"
              id="date-picker-dialog"
              label="Convention Start Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.conventionStartDate(date)}
            />
            <KeyboardDatePicker
              value={this.state.ConventionEndTime}
              margin="normal"
              id="date-picker-dialog"
              label="Convention End Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.conventionEndDate(date)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.user.authorization === 4 && (
          <ThemeProvider theme={theme}>
          <Button onClick={this.newConvention} variant="contained" color="primary">Set New Convention</Button>
          </ThemeProvider>
        )}
        <hr></hr>
        <h3>Edit Convention:</h3>
        <TextField
          value={this.props.info.ConventionName}
          id="standard-full-width"
          label="Edit Current Convention Name:"
          style={{ margin: 8 }}
          placeholder="Convention Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={event => this.updateName(event)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              value={this.props.info.ConventionStartTime}
              margin="normal"
              id="date-picker-dialog"
              label="Edit Convention Start Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.updateStartTime(date)}
            />
            <KeyboardDatePicker
              value={this.props.info.ConventionEndTime}
              margin="normal"
              id="date-picker-dialog"
              label=" Edit  Convention End Date"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              onChange={date => this.updateEndTime(date)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.user.authorization === 4 && (
          <Button onClick={this.editConvention} variant="contained" color="primary">Edit This Convention</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    info: reduxStore.ConventionsReducer,
    user: reduxStore.user
  };
};

export default withRouter(connect(mapStateToProps)(Conventions));
