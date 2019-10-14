import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        alert('Location created.')
        this.props.dispatch({
            type: "ADD_LOCATION",
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
                            type: "CREATE_LOCATION_NAME",
                            payload: event.target.value
                        })}
                ></TextField>
                <TextField
                    label="Description"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_LOCATION_DESCRIPTION",
                            payload: event.target.value
                        })}
                ></TextField>
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