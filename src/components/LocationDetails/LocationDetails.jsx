import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = ({
    root: {
        margin: '15px',
    },
    fab : {
        margin: '15px',
        marginRight: '15px',
    }  
});

class LocationDetails extends Component {

    state = {
        LocationIsActive: true,
    }

    handleBack = () => {
        this.props.history.push("/locations");
    };

    handleSave = () => {
        alert("Info has been updated");
        this.props.dispatch({
            type: "UPDATE_LOCATION_DETAILS",
            payload: this.props.details
        });
    };

    handleChange = () => {
        this.props.dispatch({
            type: "UPDATE_LOCATION_STATUS",
            payload: !this.props.details.LocationIsActive
        })
    }

    render() {
        return (
        <div>
            <h1>2D Con 2020: Remaster</h1>
            <h1>Manage Location: {this.props.details.LocationName}</h1>
            <TextField 
                label="Name" 
                className={this.props.classes.root} 
                value={this.props.details.LocationName}
                onChange={event => 
                    this.props.dispatch({
                        type: "EDIT_LOCATION_NAME",
                        payload: event.target.value
                    })
                }
            ></TextField>
            <TextField 
                label="Description" 
                className={this.props.classes.root} 
                value={this.props.details.LocationDescription}
                onChange={event => 
                    this.props.dispatch ({
                        type: "EDIT_LOCATION_DESCRIPTION",
                        payload: event.target.value
                    })
                }
            ></TextField>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={this.props.details.LocationIsActive}
                            />}
                            label="Active"
                            labelPlacement="start"
                            onChange={this.handleChange}
                            />
            </FormGroup>
            <hr></hr>
            <Button onClick={this.handleBack}>Back</Button>
            <Button onClick={this.handleSave}>Save</Button>
        </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.locationDetailsReducer
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(LocationDetails)));