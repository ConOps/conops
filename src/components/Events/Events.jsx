import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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

    }

    state = {
        columns: [
            { title: "EventID", field: "EventID", hidden: true },
            { title: "ConventionID", field: "ConventionID", hidden: true },
            { title: "Event", field: "EventName", hidden: false },
            { title: "Start Time", field: "EventStartTime", hidden: false },
            { title: "End Time", field: "EventEndTime", hidden: false },
            { title: "Description", field: "EventDescription", hidden: false },
            { title: "Location", field: "LocationName", hidden: false },
            { title: "Location Description", field: "LocationDescription", hidden: true },
            { title: "Cancelled", field: "IsCancelled", hidden: true },
            { title: "Sponsor", field: "SponsorName", hidden: false },
            { title: "Date Created", field: "DateCreated", hidden: true },
            { title: "Date Modified", field: "DatetLastModified", hidden: true },
            { title: "Notes", field: "EventModifiedNotes", hidden: true },
            { title: "Tags", field: "Tags", hidden: false }
        ],
        data: []
    }
    render() {
        return (
            <div>
                <h1>Events</h1>
                <Fab color="primary" aria-label="add" className={this.props.classes.fab}>
                    <AddIcon onClick={this.handleClick} />
                </Fab>
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
                                this.props.history.push(`/eventdetails/${rowData.EventID}`)
                            }
                        }
                    ]}
                    editable={{}}
                />
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(Events);