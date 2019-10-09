import React, { Component } from "react";
import { connect } from "react-redux";

class EventDetails extends Component {
    render() {
        return (
            <p>{JSON.stringify(this.props.reduxStore.eventDetailsReducer)}</p>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(EventDetails);