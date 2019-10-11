import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = ({
    root: {
        margin: '15px',
    },
    helperText: {
        marginLeft: '15px'
    }
});

class EventDetails extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    render() {

        let locationsInSelector = this.props.locations.map((location) => {
            return (
                <MenuItem value={location.LocationName} key={location.LocationID}>{location.LocationName}</MenuItem>
            )
        })

        return (
            <div>
                {JSON.stringify(this.props.details)}
                <h1>2D Con 2020: Remaster</h1>
                {JSON.stringify(this.props.locations)}
                <h1> Manage Event: {this.props.details.EventName}</h1>
                <hr></hr>
                <h2>Event Details</h2>
                <TextField 
                    label="Name" 
                    className={this.props.classes.root} 
                    value={this.props.details.EventName} 
                    onChange={event =>
                    this.props.dispatch({
                        type: "EDIT_EVENT_NAME",
                        payload: event.target.value
                    })}/>
                <TextField label="Start Time" className={this.props.classes.root} value={this.props.details.EventStartTime} />
                <TextField label="End Time" className={this.props.classes.root} value={this.props.details.EventEndTime} />
                <TextField label="Description" className={this.props.classes.root} value={this.props.details.EventDescription} />
                <hr></hr>
                <h2>Location Details</h2>
                <FormControl>
                    <Select
                        value={this.props.details.LocationName}
                        className={this.props.classes.root}
                    >
                        {locationsInSelector}
                    </Select>
                    <FormHelperText className={this.props.classes.helperText}>Location</FormHelperText>
                </FormControl>

            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(EventDetails)));