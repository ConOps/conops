import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

class OrderID extends Component {
  state = {
    columns: [
      { title: "AttendeeID", field: "AttendeeID", hidden: true },
      { title: "ConventionID", field: "ConventionID", hidden: true },
      { title: "First Name", field: "FirstName" },
      { title: "Last Name", field: "LastName" },
      { title: "Middle Name", field: "MiddleName", hidden: true },
      { title: "Address Line One", field: "AddressLineOne", hidden: true },
      { title: "Address Line Two", field: "AddressLineTwo", hidden: true },
      { title: "City", field: "City", hidden: true },
      { title: "State/Province", field: "StateProvince", hidden: true },
      { title: "Postal Code", field: "PostalCode", hidden: true },
      { title: "CountryID", field: "CountryID", hidden: true },
      { title: "Email Address", field: "EmailAddress" },
      { title: "Phone Number", field: "PhoneNumber" },
      { title: "Date Of Birth", field: "DateOfBirth" },
      { title: "Badge Name", field: "BadgeName" },
      { title: "Registration Date", field: "RegistrationDate", hidden: true },
      { title: "Check-In date", field: "CheckInDate", hidden: true },
      { title: "Payment Date", field: "PaymentDate", hidden: true },
      { title: "Badge Type ID", field: "BadgeTypeID", hidden: true },
      { title: "Badge Number", field: "BadgeNumber" },
      { title: "Printed", field: "Printed", hidden: true },
      { title: "Discord Verified", field: "DiscordVerified", hidden: true },
      { title: "Pre Reg Sort Number", field: "PreRegSortNumber", hidden: true },
      { title: "OrderID", field: "OrderID" }
    ],
    data: []
  };

  componentDidMount() {
    this.fetchOrderInformation();
  }


  fetchOrderInformation = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'FETCH_ORDER_INFO',
      payload: id
    });

  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Current Convention: 2DCON 2020</h1>
        {this.props.reduxStore.user.authorization === 4 ||
        this.props.reduxStore.user.authorization === 1 ? (
          <MaterialTable className = "under"
            title="Editable Example"
            columns={this.state.columns}
            options={{
              columnsButton: true,
              selection: true,
              selectionProps: rowData => ({
                disabled: rowData.CheckInDate !== null
              }),
              // headerStyle: { backgroundColor: 'blue', color: 'white' },
              pageSizeOptions: [10, 20, 50],
              toolbarButtonAlignment: "right",
              searchFieldAlignment: "left",
              showTitle: false
            }}
            // onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
            data={this.props.reduxStore.AttendeesOrderIdReducer}
            actions={[
              {
                icon: "check_circle",
                tooltip: "Check in all of the selected attendees",
                onClick: (event, data) => {
                  if (
                    window.confirm(
                      "Are you sure that you would like to check in all of the selected attendees?"
                    )
                  ) {
                    console.log(data);
                    let attendeesToCheckIn = [];
                    for (let i = 0; i < data.length; i++) {
                      console.log("i am in the loop");
                      attendeesToCheckIn.push(data[i].AttendeeID);
                    }
                    this.props.dispatch({
                      type: "CHECK_IN_ALL_SELECTED",
                      payload: attendeesToCheckIn
                    });
                    this.props.history.push(`/check-in`);
                  } else {
                    return false;
                  }
                }
              }
            ]}
            editable={{}}
          />
        ) : (
          <MaterialTable className ="under"
            title="Editable Example"
            columns={this.state.columns}
            options={{
              columnsButton: true,
              // headerStyle: { backgroundColor: 'blue', color: 'white' },
              pageSizeOptions: [10, 20, 50],
              toolbarButtonAlignment: "right",
              searchFieldAlignment: "left",
              showTitle: false
            }}
            // onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
            data={this.props.reduxStore.AttendeesOrderIdReducer}
            editable={{}}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "3%", marginRight: "3%" }}
          onClick={() => this.props.history.push("/check-in")}
        >
          Back to Check In
        </Button>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};
export default connect(mapStateToProps)(OrderID);
