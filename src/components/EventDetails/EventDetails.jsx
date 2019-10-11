import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const styles = ({
    root: {
        margin: '15px',
    },
});

class EventDetails extends Component {
    render() {
        return (
            <div>
                <h1>2D Con 2020: Remaster</h1>
                <h1> Manage Event: {this.props.details.EventName}</h1>
                <hr></hr>
                <h2>Event Details</h2>
                    <TextField label="Name" className={this.props.classes.root} value={this.props.details.EventName}></TextField>
                    <TextField label="Start Time" className={this.props.classes.root} value={this.props.details.EventStartTime}></TextField>
                    <TextField label="End Time" className={this.props.classes.root} value={this.props.details.EventEndTime}></TextField>
                    <TextField label="Description" className={this.props.classes.root} value={this.props.details.EventDescription}></TextField>
                <hr></hr>
                <h2>Location Details</h2>
                {/* <Select
                    value={this.details.LocationName}
                ></Select> */}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(EventDetails)));