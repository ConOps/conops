import React, { Component } from 'react';
import { connect } from "react-redux";
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
    fab: {
        margin: '15px',
        marginRight: '15px',
    } 
});

class SponsorDetails extends Component {
    componentDidMount() {
        this.fetchSponsorDetails();
    }

    fetchSponsorDetails = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_SPONSOR_DETAILS',
            payload: id
        });
    }

    state = {
        SponsorIsActive: true,
    }

    handleBack = () => {
        this.props.history.push("/sponsors");
    };

    handleSave = () => {
        alert("Info has been updated");
        this.props.dispatch({
            type: "UPDATE_SPONSOR_DETAILS",
            payload: this.props.details
        });
    };

    handleChange = () => {
        this.props.dispatch({
            type: "EDIT_SPONSOR_STATUS",
            payload: !this.props.details.SponsorIsActive
        })
    }

    render() {
        console.log('SPONSOR NAME:', this.props.details.SponsorName)
        return (
            <div>
                <h1>2D Con 2020: Remaster</h1>
                <h1>Manage Sponsor: {this.props.details.SponsorName}</h1>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    value={this.props.details.SponsorName}
                    onChange={event => 
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_NAME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Amount Paid"
                    className={this.props.classes.root}
                    value={this.props.details.AmountPaid}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_AMOUNT_PAID",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Website"
                    className={this.props.classes.root}
                    value={this.props.details.Website}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_WEBSITE",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Notes"
                    className={this.props.classes.root}
                    value={this.props.details.Notes}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_SPONSOR_NOTES",
                            payload: event.target.value
                        })}
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.details.SponsorIsActive}
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
        details: reduxStore.sponsorDetailsReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(SponsorDetails));
