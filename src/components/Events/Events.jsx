import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';

import Chip from '@material-ui/core/Chip';


import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: "#19375f" }
  }
}); 

const styles = ({
    root: {
        margin: '15px',
    },
    fab: {
        margin: '15px',
        marginRight: '0px',
    }
});

class Events extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
        this.props.dispatch({ type: 'FETCH_LOCATIONS' });
        this.props.dispatch({ type: 'CLEAR_EVENT_DETAILS'})

    }

    state = {
        columns: [
            { title: "EventID", field: "EventID", hidden: true },
            { title: "ConventionID", field: "ConventionID", hidden: true },
            { title: "Event", field: "EventName", hidden: false },
            { title: "Start Time", field: "EventStartTime", hidden: false, render: (rowData) => <p>{moment(rowData.EventStartTime).format('llll')}</p> },
            { title: "End Time", field: "EventEndTime", hidden: false, render: (rowData) => <p>{moment(rowData.EventEndTime).format('llll')}</p> },
            { title: "Description", field: "EventDescription", hidden: false },
            { title: "Location", field: "LocationName", hidden: false },
            { title: "Location Description", field: "LocationDescription", hidden: true },
        { title: "Cancelled", field: "IsCancelled", hidden: true, render: (rowData) => <p>{JSON.stringify(rowData.IsCancelled)}</p> },
            { title: "Sponsor", field: "SponsorName", hidden: false },
            { title: "Date Created", field: "DateCreated", hidden: true },
            { title: "Date Modified", field: "DatetLastModified", hidden: true },
            { title: "Notes", field: "EventModifiedNotes", hidden: true },
            {
              title: "Tags", field: "Tags", hidden: false, render: (rowData) =>  
                <p>{rowData.Tags} </p> },
        ],
        data: []
    }

    handleClick = () => {
        this.props.history.push('/events/create')
    }

    render() {
        return (

          <div>
            <h1 style={{textAlign: 'center'}}>Events</h1>
            {(this.props.reduxStore.user.authorization === 4 ||
              this.props.reduxStore.user.authorization === 2) && (
              <ThemeProvider theme={theme}>
              <Fab
                color="primary"
                aria-label="add"
                className={this.props.classes.fab}
                onClick={this.handleClick} 
              >
                <AddIcon />
              </Fab>
              </ThemeProvider>
            )}
            {this.props.reduxStore.user.authorization === 4 ||
            this.props.reduxStore.user.authorization === 2 ? (
              <MaterialTable
                title="Events"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.EventsReducer}
                actions={[
                  {
                    icon: "event",
                    tooltip: "Edit Event",
                    onClick: (event, rowData) => {
                      this.props.history.push(
                        `/eventdetails/${rowData.EventID}`
                      );
                    }
                  }
                ]}
                editable={{}}
              />
            ) : (
              <MaterialTable
                title="Events"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.EventsReducer}
                editable={{}}
              />
            )}
          </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default withStyles(styles)(connect(mapStateToProps)(Events));