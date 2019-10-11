import React, { Component  } from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";

class Locations extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LOCATIONS' })
    }

    state = {
        columns:  [
            { title: "LocationID", field: "LocationID", hidden: true},
            { title: "Location Name", field: "LocationName", hidden: false },
            { title: "Location Description", field: "LocationDescription", hidden: false}
        ],
        data: []
    }

    render() {
        return(
            <div>
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
                                this.props.dispatch({
                                    type: "FETCH_LOCATION_DETAILS",
                                    payload: rowData.LocationID
                                });
                                this.props.history.push('/locationdetails')
                            }
                        }
                    ]}
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
export default connect(mapStateToProps)(Locations);