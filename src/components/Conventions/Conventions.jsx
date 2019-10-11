import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 

class Conventions extends Component {

    state={}

    componentDidMount() {
        
    }

handleConventionName = (event) => {
    this.setState({
        conventionName: event.target.value
    })
}

conventionStartDate = (date) => {
    this.setState({
        conventionStartDate: date
    })
}

conventionEndDate = (date) => {
    this.setState({
        conventionEndDate: date
    })
}

newConvention = () => {
    console.log('convention state', this.state);
    
    this.props.dispatch({
        type: 'ADD_NEW_CONVENTION',
        payload: this.state
    })
}

    
    render(){
        return(
            <div>
                <h1>The Active Convention is: </h1>
                <hr></hr>
                <h3>Create New Convention:</h3>
                <TextField
                    id="standard-full-width"
                    label="New Convention Name:"
                    style={{ margin: 8 }}
                    placeholder="Convention Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => this.handleConventionName(event)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Convention Start Date"
                            format="MM/dd/yyyy"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            onChange={(date) => this.conventionStartDate(date)}
                        /> 
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Convention End Date"
                            format="MM/dd/yyyy"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} 
                            onChange={(date) => this.conventionEndDate(date)}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button onClick={this.newConvention}>Set New Convention</Button>
                    <hr></hr>
                    <h3>Edit Convention:</h3>
                <TextField
                    id="standard-full-width"
                    label="Edit Current Convention Name:"
                    style={{ margin: 8 }}
                    placeholder="Convention Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Edit Convention Start Date"
                            format="MM/dd/yyyy"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label=" Edit  Convention End Date"
                            format="MM/dd/yyyy"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Button onClick={this.handleEditConvention}>Edit This Convention</Button>
            </div>
        )
    }
}

export default withRouter(connect()(Conventions));