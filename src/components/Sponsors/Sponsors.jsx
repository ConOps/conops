import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";

const styles = ({
    root: {
        margin: '15px',
    }
});

class Sponsors extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SPONSORS' })
    }

    state = {
        columns: [
            { title: "SponsorID", field: "SponsorID", hidden: true },
            { title: "Sponsor Name", field: "SponsorName", hidden: false },
            { title: "Amount Paid", field: "AmountPaid", hidden: false }, 
            { title: "Website", field: "Website", hidden: false },
            { title: "Notes", field: "Notes", false: false },
            { title: "Active Status", field: "SponsorIsActive", hidden: false }
        ], 
        data: []
    }

    render() {
        return(
            <div>
                <p>Sponsors</p>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default withStyles(styles)(connect(mapStateToProps)(Sponsors));