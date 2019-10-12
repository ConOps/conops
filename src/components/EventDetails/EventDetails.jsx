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
        this.props.dispatch({
            type: 'FETCH_LOCATIONS'
        });
        this.props.dispatch({
            type: 'FETCH_TAG_LIST'
        });
        this.fetchEventDetails();
    }


    fetchEventDetails = () => {
        let id = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_EVENT_DETAILS',
            payload: id
        });
    }

    // handleChange = (type) => (event) => {

    // }

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
                            onDelete={() => this.handleTagDelete(tag.id)}
                            // onClick={() => this.handleTagClick(tag)}
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
                    InputLabelProps={{ shrink: this.props.details.EventName }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_NAME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Start Time"
                    className={this.props.classes.root}
                    value={this.props.details.EventStartTime}
                    InputLabelProps={{ shrink: this.props.details.EventStartTime }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_START_TIME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="End Time"
                    className={this.props.classes.root}
                    value={this.props.details.EventEndTime}
                    InputLabelProps={{ shrink: this.props.details.EventEndTime }}
                    onChange={event =>
                        this.props.dispatch({
                            type: "EDIT_EVENT_END_TIME",
                            payload: event.target.value
                        })}
                />
                <TextField
                    label="Description"
                    className={this.props.classes.root}
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
                <Grid item container direction="column" spacing={2} justify="center">
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

            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.eventDetailsReducer,
        locations: reduxStore.LocationReducer,
        tags: reduxStore.TagsReducer
    };
};

export default withStyles(styles)(connect(mapStateToProps)(EventDetails));