import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const styles = ({
    root: {
        margin: '15px',
    },
});

const theme = createMuiTheme({
    palette: {
        primary: { main: "#19375f" }
    }
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateEvent extends Component {
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
    }

    handleCancel = () => {
        this.props.history.push('/events');
    }

    state = {
            LocationID: '',
            TagID: [],
            SponsorID: '',
            openSave: false,
    }

    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    handleLocationChange = (event) => {
        console.log('SELECTED LOCATION:', event.target.value)
        this.setState({ LocationID: event.target.value })    
        this.props.dispatch({
            type: 'CREATE_EVENT_LOCATION',
            payload: event.target.value
        })
    }

    handleTagChange = (event) => {
        console.log('SELECTED TAG(S):', event.target.value)
        this.setState({ TagID: event.target.value })
        this.props.dispatch({
            type: 'CREATE_EVENT_TAGS',
            payload: event.target.value
        })
    }

    handleSponsorChange = (event) => {
        console.log('SELECTED SPONSOR:', event.target.value)
        this.setState({ SponsorID: event.target.value })
        this.props.dispatch({
            type: 'CREATE_EVENT_SPONSOR',
            payload: event.target.value
        })
    }

    handleSave = () => {
        this.setState({
            openSave: !this.state.openSave,
        })
        // alert('Event created.')
        // this.props.dispatch({
        //     type: 'ADD_EVENT',
        //     payload: this.props.details
        // })
    }

    saveEvent = () => {
        this.props.dispatch({
            type: 'ADD_EVENT',
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push(`/events`);
    }

    render() {
        let locationsInSelector = this.props.locations.map((location) => {
            return (
                <MenuItem value={location.LocationID} key={location.LocationID}>{location.LocationName}</MenuItem>
            )
        });

        let eventTags = this.props.details.Tags.map((tag) => {
            return (
                <Grid item key={tag}>
                    <Chip
                        key={tag}
                        label={tag}
                        // onDelete={() => this.handleTagDelete(tag.id)}
                        // onClick={() => this.handleTagClick(tag)}
                        className={this.props.classes.chip}
                        color="primary"
                    />
                </Grid>
            )
        });

        let allTags = this.props.tags.map((tag) => {
            return (
                <MenuItem value={tag.TagName} key={tag.TagID}>{tag.TagName}</MenuItem>
            )
        });

        let sponsorsInSelector = this.props.sponsors.map((sponsor) => {
            return (
                <MenuItem value={sponsor.SponsorID} key={sponsor.SponsorID}>{sponsor.SponsorName}</MenuItem>
            )
        });

        return (
            <div>
                
                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move', color: 'white' }} id="draggable-dialog-title" className="Dialog">
                        Create Event?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'black' }}>
                            Are you sure that you would like to create this Event?
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Start Time"
                        value={this.props.details.EventStartTime || this.props.conventions.ConventionStartTime}
                        className={this.props.classes.root}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "CREATE_EVENT_START_TIME",
                                payload: date
                            })
                        }
                    />
                    <KeyboardDateTimePicker
                        label="End Time"
                        value={this.props.details.EventEndTime || this.props.conventions.ConventionEndTime}
                        className={this.props.classes.root}
                        format="MM/dd/yyyy HH:mm"
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        onChange={date =>
                            this.props.dispatch({
                                type: "CREATE_EVENT_END_TIME",
                                payload: date
                            })
                        }
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    label="Description"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_EVENT_DESCRIPTION",
                            payload: event.target.value
                        })}
                />
                <hr></hr>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Location</FormHelperText>
                <Select
                    value={this.state.LocationID}
                    className={this.props.classes.root}
                    onChange={(event) => this.handleLocationChange(event)}
                >
                    {locationsInSelector}
                </Select>
                </FormControl>
                <hr></hr>
                <Grid item container direction="row" spacing={2} justify="flex-start">
                    {eventTags}
                </Grid>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Add Tags</FormHelperText>
                    <Select
                        multiple
                        value={this.state.TagID}
                        className={this.props.classes.root}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        onChange={(event) => this.handleTagChange(event)}
                    >
                        {allTags}
                    </Select>
                </FormControl>
                <hr></hr>
                <FormControl>
                    <FormHelperText className={this.props.classes.helperText}>Sponsor</FormHelperText>
                    <Select
                        value={this.state.SponsorID}
                        className={this.props.classes.root}
                        onChange={(event) => this.handleSponsorChange(event)}
                    >
                        {sponsorsInSelector}
                    </Select>
                </FormControl>
                <hr></hr>
                <Button onClick={this.handleCancel}>Cancel</Button>
                <Button onClick={this.handleSave}>Save</Button>
            </div>
            
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer,
        tags: reduxStore.TagsReducer,
        sponsors: reduxStore.sponsorReducer,
        conventions: reduxStore.ConventionsReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateEvent));