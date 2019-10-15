import React, { Component  } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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



class Locations extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    handleClick = () => {
        this.props.history.push('/locations/create')
    }

    state = {
        columns:  [
            { title: "LocationID", field: "LocationID", hidden: true},
            { title: "Location Name", field: "LocationName", hidden: false },
            { title: "Location Description", field: "LocationDescription", hidden: false},
            { title: "Active Status", field: "LocationIsActive", hidden: false}
        ],
        data: []
    }

    render() {
        return (
          <div>
            <h1>Locations</h1>
            {this.props.reduxStore.user.authorization === 4 && (
              <ThemeProvider theme={theme}>
              <Fab
                color="primary"
                aria-label="add"
                className={this.props.classes.fab}
              >
                <AddIcon onClick={this.handleClick} />
              </Fab>
              </ThemeProvider>
            )}
            {this.props.reduxStore.user.authorization === 4 && (
              <MaterialTable
                title="Locations"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.LocationReducer}
                editable={{}}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Edit Location",
                    onClick: (event, rowData) => {
                      // this.props.dispatch({
                      //   type: "FETCH_LOCATION_DETAILS",
                      //   payload: rowData.LocationID
                      // });
                      this.props.history.push(`/location/details/${rowData.LocationID}`);
                    }
                  }
                ]}
              />
            )}
            {this.props.reduxStore.user.authorization !== 4 && (
              <MaterialTable
                title="Locations"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.LocationReducer}
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
export default withStyles(styles)(connect(mapStateToProps)(Locations));