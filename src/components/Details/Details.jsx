import React, { Component }from 'react';
import './Details.css';


class Details extends Component {
    render(){
        return(
            <div>
                <h1 className = "test">  Manage Attendee: </h1>
                <h1> 2D Con 2020: Remaster</h1>

                <p>Find All Attendees with Order ID: </p>
                <button>Find</button>
                <button> Check-In </button>
                <button>Delete</button> {/*will conditionaly render if there a admin or not */}
                <h2>personal info</h2>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <h2>Contact Info</h2>
                <input></input>
                <input></input>
                <h2>Badge Info</h2>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <h2>Convention Info</h2>
                <h5>2D Con 2020: Remaster</h5>
                <input></input>
                <input></input>
                <input></input>
            </div>
        )
    }
}

export default Details;
