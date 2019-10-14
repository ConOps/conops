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
            { title: ""}
        ]
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