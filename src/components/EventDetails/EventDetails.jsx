import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from "@material-ui/pickers";
import moment from 'moment';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    }
});


const styles = ({
    root: {
        margin: '15px',
    },
    multiline: {
        margin: '0px',
        maxWidth: '80%'
        // width: '300'
    },
    helperText: {
        marginLeft: '15px'
    },
    cancelledText: {
        fontWeight: 'bold',
        color: 'red'
    },
    topRight: {
        marginRight: '0px'
    }
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class EventDetails extends Component {
    state = {
        openSave: false,
        openAlert: false,
        openCancel: false,
        openActivate: false,
        details: {},
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_LOCATIONS'
        });
        this.props.dispatch({
            type: 'FETCH_TAG_LIST'
        });
        this.props.dispatch({
            type: 'FETCH_CONVENTION'
        });
        this.props.dispatch({
            type: 'FETCH_SPONSORS'
        });

        this.fetchEventDetails();
    }

    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    handleCloseAlert = () => {
        this.setState({ openAlert: false });
    };

    handleCloseCancel = () => {
        this.setState({ openCancel: false });
    };

    handleCloseActivate = () => {
        this.setState({ openActivate: false });
    };


    fetchEventDetails = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_EVENT_DETAILS',
            payload: id
        });
    }

    handleBack = () => {
        this.props.history.push("/events");
    };

    handleSave = () => {
        console.log('clicked save!');
        if (this.props.details.EventModifiedNotes === null || this.props.details.EventModifiedNotes === '') {
            this.setState({
                openAlert: !this.state.openAlert
            })
        } else {
            this.setState({
                openSave: !this.state.openSave,
                ...this.state.details, details: this.props.details
            })
        }

    }

    saveEvent = () => {
        this.props.dispatch({
            type: "UPDATE_EVENT_INFO",
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push("/events");
    }

    cancelEvent = () => {
        this.props.dispatch({
            type: "CANCEL_EVENT",
            payload: this.props.details.EventID
        });
        this.handleCloseCancel();
    }

    activateEvent = () => {
        this.props.dispatch({
            type: "UNCANCEL_EVENT",
            payload: this.props.details.EventID
        });
        this.handleCloseActivate();
    }

    handleDeleteTag = (tag) => {
        console.log('clicked on tag', tag);
        this.props.dispatch({
            type: 'REMOVE_TAG_FROM_EVENT',
            payload: tag
        })

    }



    render() {

        let locationsInSelector = this.props.locations.map((location) => {
            if (location.LocationIsActive === true) {
                return (
                    <MenuItem value={location.LocationID} key={location.LocationID}>{location.LocationName}</MenuItem>
                )
            } else {
                return false
            }

        });

        let eventTags = this.props.details.TagObjects.map((tag) => {
            return (
                <Grid item key={tag.TagID}>
                    <Chip
                        key={tag.TagID}
                        label={tag.TagName}
                        value={tag.TagID}
                        className={this.props.classes.chip}
                        onDelete={() => this.handleDeleteTag(tag)}
                        color="primary"
                    />
                </Grid>
            )
        })

        let allTags = this.props.tags.map((tag) => {
            if (tag.TagIsActive === true) {
                return (
                    <MenuItem value={tag} key={tag.TagID}>{tag.TagName}</MenuItem>
                )
            } else {
                return false
            }

        })

        let sponsorSelector = this.props.sponsors.map((sponsor) => {
            if (sponsor.SponsorIsActive === true) {
                return (
                    <MenuItem value={sponsor.SponsorID} key={sponsor.SponsorID}>{sponsor.SponsorName}</MenuItem>
                )
            } else {
                return false
            }

        })

        return (
            <div style={{ margin: '20px' }}>

                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Edit Event?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to edit this Event?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSave} variant="contained" color="secondary">
                            Cancel
          </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.saveEvent} variant="contained" color="primary">
                                Confirm
          </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openAlert}
                    onClose={this.handleCloseAlert}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Missing Information?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Please enter some notes of what you changed!
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.handleCloseAlert} variant="contained" color="primary">
                                Confirm
          </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openCancel}
                    onClose={this.handleCloseCancel}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Cancel Event?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to cancel this Event?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseCancel} variant="contained" color="secondary">
                            Back
          </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.cancelEvent} variant="contained" color="primary">
                                Confirm
          </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openActivate}
                    onClose={this.handleCloseActivate}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Activate Event?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to activate this Event?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseActivate} variant="contained" color="secondary">
                            Back
          </Button>
                        <ThemeProvider theme={theme}>
                            <Button onClick={this.activateEvent} variant="contained" color="primary">
                                Confirm
          </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>

                {/* {JSON.stringify(this.props.details)} */}
                <h1>{this.props.convention.ConventionName}</h1>
                {this.props.details.IsCancelled && <h3 className={this.props.classes.cancelledText}>Event is cancelled.</h3>}
                <h1> Manage Event: {this.props.details.EventName}</h1>
                {this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.setState({
                        openActivate: !this.state.openActivate,
                        ...this.state.details, details: this.props.details.EventId
                    })
                }}>
                    Make Active
                </Button>}
                {!this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.setState({
                        openCancel: !this.state.openCancel,
                        ...this.state.details, details: this.props.details.EventId
                    })
                }}>
                    Cancel
                </Button>}
                <div className={this.props.classes.topRight}>
                    {this.props.details.DateLastModified && <h3 className={this.props.classes.cancelledText}>Event Has Been Modified!</h3>}
                    {this.props.details.DateLastModified && <h4 className={this.props.classes.cancelledText}>{moment(this.props.details.DateLastModified).format('LLLL')}</h4>}
                    <TextField
                        label="Change Notes"
                        multiline
                        fullWidth
                        margin="normal"
                        className={this.props.classes.multiline}
                        value={this.props.details.EventModifiedNotes}
                        InputLabelProps={{ shrink: this.props.details.EventModifiedNotes }}
                        onChange={event =>
                            this.props.dispatch({
                                type: "EDIT_EVENT_MODIFIED_NOTES",
                                payload: event.target.value
                            })}
                    />
                </div>
                <hr></hr>
                <h2>Event Details</h2>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    value={this.props.details.EventName}
                    InputLabelProps={{ shrink: this.props.details.EventName }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_NAME",
                            payload: event.target.value
                        })}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Start Time"
                        className={this.props.classes.root}
                        value={this.props.details.EventStartTime}
                        InputLabelProps={{ shrink: this.props.details.EventName }}
                        format="MM/dd/yyyy h:mm a"
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
                        format="MM/dd/yyyy h:mm a"
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
                <TextField
                    label="Description"
                    multiline
                    fullWidth
                    margin="normal"
                    className={this.props.classes.multiline}
                    value={this.props.details.EventDescription}
                    InputLabelProps={{ shrink: this.props.details.EventDescription }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_DESCRIPTION",
                            payload: event.target.value
                        })}
                />
                <hr></hr>
                <h2>Location Details</h2>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Location</FormHelperText>
                    <Select
                        value={this.props.details.LocationID}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_LOCATION',
                                payload: event.target.value
                            })}
                    >
                        {locationsInSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <h2>Tag Details</h2>
                <Grid item container direction="row" spacing={2} justify="flex-start">
                    {eventTags}
                </Grid>
                {/* {JSON.stringify(this.props.details.TagObjects)} */}

                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Add Tags</FormHelperText>
                    <Select
                        value={this.props.tags}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_TAGS',
                                payload: event.target.value
                            })}
                    >
                        {allTags}
                    </Select>
                </FormControl>
                <hr></hr>
                <h2>Sponsor Info</h2>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Selected Sponsor</FormHelperText>
                    <Select
                        value={this.props.details.SponsorID}
                        className={this.props.classes.root}
                        onChange={event =>
                            this.props.dispatch({
                                type: 'EDIT_EVENT_SPONSOR',
                                payload: event.target.value
                            })}
                    >
                        {sponsorSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <div>
                    <Button variant="contained" color="secondary" onClick={this.handleBack} style={{ margin: '5px' }}>
                        Back
                    </Button>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" onClick={this.handleSave} style={{ margin: '5px' }}>
                            Save
                    </Button>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer,
        tags: reduxStore.TagsReducer,

        convention: reduxStore.ConventionsReducer,
        sponsors: reduxStore.sponsorReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(EventDetails));