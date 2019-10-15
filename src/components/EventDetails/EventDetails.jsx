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

class EventDetails extends Component {
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
        this.props.dispatch({ type: 'FETCH_SPONSORS' })

        this.fetchEventDetails();
    }


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

        // alert("Event has been updated");
        this.props.dispatch({
            type: "UPDATE_EVENT_INFO",
            payload: this.props.details
        });
        this.props.history.push("/events");
    }


    render() {

        let locationsInSelector = this.props.locations.map((location) => {
            return (
                <MenuItem value={location.LocationName} key={location.LocationID}>{location.LocationName}</MenuItem>
            )
        });

        let eventTags = this.props.details.Tags.map((tag) => {
            return (
                <Grid item key={tag}>
                    <Chip
                        key={tag}
                        label={tag}
                        className={this.props.classes.chip}
                        color="primary"
                    />
                </Grid>
            )
        })

        let allTags = this.props.tags.map((tag) => {
            return (
                <MenuItem value={tag.TagName} key={tag.TagID}>{tag.TagName}</MenuItem>
            )
        })

        let sponsorSelector = this.props.sponsors.map((sponsor) => {
            return (
                <MenuItem value={sponsor.SponsorName} key={sponsor.SponsorID}>{sponsor.SponsorName}</MenuItem>
            )
        })

        return (
            <div>
                {/* {JSON.stringify(this.props.details)} */}
                <h1>{this.props.convention.ConventionName}</h1>
                {this.props.details.IsCancelled && <h3 className={this.props.classes.cancelledText}>Event is cancelled.</h3>}
                <h1> Manage Event: {this.props.details.EventName}</h1>
                {this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.props.dispatch({
                        type: "UNCANCEL_EVENT",
                        payload: this.props.details.EventID
                    })
                }}>
                    UnCancel
                </Button>}
                {!this.props.details.IsCancelled && <Button variant="contained" color="secondary" onClick={() => {
                    this.props.dispatch({
                        type: "CANCEL_EVENT",
                        payload: this.props.details.EventID
                    })
                }}>
                    Cancel
                </Button>}
                <div className={this.props.classes.topRight}>
                    {this.props.details.DateLastModified && <h3 className={this.props.classes.cancelledText}>Event Has Been Modified!</h3>}
                    {this.props.details.DateLastModified && <h4 className={this.props.classes.cancelledText}>{moment(this.props.details.DateLastModified).format('LLLL')}</h4>}
                    {this.props.details.EventModifiedNotes && <h4>{this.props.details.EventModifiedNotes}</h4>}
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
                        value={this.props.details.LocationName}
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
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Add Tags</FormHelperText>
                    <Select
                        multiple
                        value={this.props.details.Tags}
                        className={this.props.classes.root}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
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
                        value={this.props.details.SponsorName}
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
                <div>
                    <Button variant="contained" color="secondary" onClick={this.handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleSave}>
                        Save
                    </Button>
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