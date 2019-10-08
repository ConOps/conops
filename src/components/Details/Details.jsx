import React, { Component }from 'react';
import './Details.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class Details extends Component {

    state={
        Badge: "",
    }


    handleChange = (event) => {
        this.setState({
            Badge: event.target.value
        })
    } 

    

    render(){
        return(
            <div>
                <div>
                <h1>  Manage Attendee: </h1>{/* needs to render the name of the attendee */}
                <h1> 2D Con 2020: Remaster</h1>
                </div>
                <div>
                    <p>Find All Attendees With Order ID: </p> 
                        <Button>Find</Button>
                        <Button> Check-In </Button>
                        <Button>Delete</Button> {/*will conditionaly render if there a admin or not */}
                </div>
                <h2>Personal Info</h2>
                    <TextField label="First Name"></TextField>
                    <TextField label="Middle Name"></TextField>
                    <TextField label="Last Name"></TextField>
                    <TextField label="Street Name 1"></TextField>
                    <TextField label="Street Name 2"></TextField>
                    <TextField label="City"></TextField>
                    <TextField label="State/Province"></TextField>
                    <TextField label="Zip/Postal Code"></TextField>
                    <TextField label="United States"></TextField>
                <h2>Contact Info</h2>
                    <TextField label="Email Address"></TextField>
                    <TextField label="Phone Number"></TextField>
                <h2>Badge Info</h2>
                <InputLabel>Badge Type</InputLabel>
                <Select
                    value={this.state.Badge}
                    onChange={(event) => this.handleChange(event)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="child">Child (6 and under)</MenuItem>
                    <MenuItem value="Adult 14">Adult (14 - 20)</MenuItem>
                    <MenuItem value="Adult 21">Adult (Over 21)</MenuItem>
                </Select>
                    <TextField label="Badge Number"></TextField>{/* no handle change or on change, CANT BE EDITED */}
                    <TextField label="Date of Birth"></TextField>
                    <TextField label="Badge Name"></TextField>
                <div>
                    <h2>Convention Info</h2>
                    <h5>2D Con 2020: Remaster</h5>
                        <TextField></TextField>
                        <TextField></TextField>
                        <TextField></TextField>
                </div>
                <Button>Back</Button>
                <Button>Save</Button>
            </div>
        )
    }
}

export default Details;
