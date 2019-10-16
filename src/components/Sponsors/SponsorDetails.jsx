import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const styles = ({
    root: {
        margin: '15px',
    },
    fab: {
        margin: '15px',
        marginRight: '15px',
    } 
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

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
        openSave: false,
        details: {},
    }

    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    handleBack = () => {
        this.props.history.push("/sponsors");
    };

    handleSave = () => {
        this.setState({
            openSave: !this.state.openSave,
            ...this.state.details, details: this.props.details
        })
    };

    saveSponsor = () => {
        this.props.dispatch({
            type: "UPDATE_SPONSOR_DETAILS",
            payload: this.props.details
        });
        this.handleCloseSave();
    }

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

                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Edit Sponsor?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure that you would like to edit this sponsor?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSave} color="primary">
                            Cancel
          </Button>
                        <Button onClick={this.saveSponsor} color="primary">
                            Confirm
          </Button>
                    </DialogActions>
                </Dialog>

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
