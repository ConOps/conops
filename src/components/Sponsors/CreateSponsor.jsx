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

class CreateSponsor extends Component {
    handleCancel = () => {
        this.props.history.push('/sponsors');
    }

    handleSave = (event) => {
        alert('Sponsor created.')
        this.props.dispatch({
            type: "ADD_SPONSOR",
            payload: this.props.details
        })
    }
    render() {
        return (
            <div>
                <h1>Create Sponsor</h1>
                <hr></hr>
                <TextField
                    label="Name"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_NAME",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Amount Paid"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_AMOUNT_PAID",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Website"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_WEBSITE",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <TextField
                    label="Notes"
                    className={this.props.classes.root}
                    onChange={event =>
                        this.props.dispatch({
                            type: "CREATE_SPONSOR_NOTES",
                            payload: event.target.value
                        })
                    }
                ></TextField>
                <hr></hr>
                <Button onClick={this.handleCancel}>Cancel</Button>
                {this.props.user.authorization === 4 && (
                    <Button onClick={this.handleSave}>Save</Button>
                )}
            </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.sponsorDetailsReducer,
        user: reduxStore.user
    };
};

export default withStyles(styles)(connect(mapStateToProps)(CreateSponsor));