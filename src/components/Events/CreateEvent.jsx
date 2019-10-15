import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from "@material-ui/pickers";

const styles = ({
    root: {
        margin: '15px',
    },
});

class CreateEvent extends Component {
    handleCancel = () => {
        this.props.history.push('/events');
    }

    handleSave = (event) => {
        alert('Event created.')
        this.props.dispatch({
            type: 'ADD_EVENT',
            payload: this.props.details
        })
    }
    render() {
        return (
            <div>
                <h1>Create Event</h1>
                <hr></hr>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_EVENT_NAME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Description"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_EVENT_DESCRIPTION",
                            payload: event.target.value
                        })}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Start Time"
                        className={this.props.classes.root}
                        value={this.props.details.EventStartTime}
                        InputLabelProps={{ shrink: this.props.details.EventName }}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_START_TIME",
                                payload: date
                            })
                        }
                    />
                    <KeyboardDateTimePicker
                        label="End Time"
                        className={this.props.classes.root}
                        value={this.props.details.EventEndTime}
                        InputLabelProps={{ shrink: this.props.details.EventName }}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_END_TIME",
                                payload: date
                            })
                        }
                    />
                </MuiPickersUtilsProvider>
                <hr></hr>
                <Button onClick={this.handleCancel}>Cancel</Button>
                <Button onClick={this.handleSave}>Save</Button>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        // create: reduxStore.
    };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateEvent));