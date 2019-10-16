import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateSponsor extends Component {
    state = {
        openSave: false,
    }

    handleCancel = () => {
        this.props.history.push('/sponsors');
    }

    handleCloseSave = () => {
        this.setState({ openSave: false });
    };

    handleSave = () => {
        this.setState({
            openSave: !this.state.openSave,
        })
    }

    saveSponsor = () => {
        this.props.dispatch({
            type: "ADD_SPONSOR",
            payload: this.props.details
        });
        this.handleCloseSave();
        this.props.history.push(`/sponsors`);
    }

    render() {
        return (
            <div>

                <Dialog
                    open={this.state.openSave}
                    onClose={this.handleCloseSave}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Create Sponsor?
        </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure that you would like to create this Sponsor?
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