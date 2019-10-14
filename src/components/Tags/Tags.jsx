import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";



class Tags extends Component {
    state = {
        columns: [
            { title: "TagID", field: "TagID" },
            { title: "TagName", field: "TagName" },

        ],
        data: []
    };

    componentDidMount() {
        this.fetchAllTags();
    };

    fetchAllTags() {
        this.props.dispatch({
            type: 'FETCH_TAG_LIST'
        })
    }

    render() {
        return (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Current Convention: 2DCON 2020
            </h1>
            <h2 style={{ textAlign: "center" }}>Tags</h2>
            <div style={{ textAlign: "right", marginRight: "2%" }}>
             
            {this.props.reduxStore.user.authorization == 4 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.history.push(`/createTag`)}
              >
                Create New Tag
              </Button>
            )}           
            </div>
            {this.props.reduxStore.user.authorization == 4 ? (
              <MaterialTable
                title="Editable Example"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  // headerStyle: { backgroundColor: 'blue', color: 'white' },
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.TagsReducer}
                editable={{}}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      this.props.history.push(`/edittag/${rowData.TagID}`);
                    }
                  }
                  // {
                  //     icon: "delete",
                  //     tooltip: "Delete",
                  //     onClick: (event, rowData) => {
                  //         console.log(rowData.orderID);
                  //         this.props.dispatch({
                  //             type: "DELETE_TAG_INFO",
                  //             payload: rowData.TagID
                  //         });
                  //     },

                  // },
                ]}
              />
            ) : (
              <MaterialTable
                title="Editable Example"
                columns={this.state.columns}
                options={{
                  columnsButton: true,
                  pageSize: 10,
                  // headerStyle: { backgroundColor: 'blue', color: 'white' },
                  pageSizeOptions: [10, 20, 50],
                  toolbarButtonAlignment: "right",
                  searchFieldAlignment: "left",
                  showTitle: false
                }}
                data={this.props.reduxStore.TagsReducer}
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
export default connect(mapStateToProps)(Tags);
