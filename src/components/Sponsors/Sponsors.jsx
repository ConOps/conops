import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import { Fab } from '@material-ui/core';
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

class Sponsors extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SPONSORS' })
    }

    handleClick = () => {
        this.props.history.push('/sponsors/create')
    }

    state = {
        columns: [
            { title: "SponsorID", field: "SponsorID", hidden: true },
            { title: "Sponsor Name", field: "SponsorName", hidden: false },
            { title: "Amount Paid", field: "AmountPaid", hidden: false }, 
            { title: "Website", field: "Website", hidden: false },
            { title: "Notes", field: "Notes", false: false },
            { title: "Active Status", field: "SponsorIsActive", hidden: false, render: (rowData) => <p>{JSON.stringify(rowData.SponsorIsActive)}</p>}
        ], 
        data: []
    }

    render() {
        return (
            <div style={{ marginTop: '65px' }}>
                <h1 style={{textAlign: 'center'}}>Sponsors</h1>
            {this.props.reduxStore.user.authorization === 4 ? (
                <div>
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
                <MaterialTable
                    title="Sponsors"
                    columns={this.state.columns}
                    options={{
                        columnsButton: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50],
                        toolbarButtonAlignment: "right",
                        searchFieldAlignment: "left",
                        showTitle: false
                    }}
                    data={this.props.reduxStore.sponsorReducer}
                    editable={{}}
                    actions={[
                        {
                        icon: "edit",
                        tooltip: "Edit Sponsor",
                        onClick: (event, rowData) => {
                            this.props.dispatch({
                                type: "FETCH_SPONSOR_DETAILS",
                                payload: rowData.SponsorID
                            })
                            this.props.history.push(`/sponsor/details/${rowData.SponsorID}`)
                            }
                        }
                    ]}
                />
                </div>
            ) : (
              <MaterialTable
                title="Sponsors"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.sponsorReducer}
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

export default withStyles(styles)(connect(mapStateToProps)(Sponsors));