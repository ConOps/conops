import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

class CheckIn extends Component {
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
      {
        title: "OrderID",
        field: "orderID"
      }
    ],
    data: []
  };

  humanClicker = (event, id) => {};

 
  

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Current Convention: 2DCON 2020</h1>
        <p style={{ textAlign: "center" }}>FILTER</p>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_CHECKED_IN_ATTENDEES"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            CHECKED-IN
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_PRE-REGISTERED_ATTENDEES"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            PRE-REGISTERED
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_WALK_INS"
              });
            }}
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%", marginRight: "5%" }}
          >
            WALK-IN
          </Button>
          <Button
            onClick={() => {
              this.props.dispatch({
                type: "FETCH_ALL_ATTENDEES"
              });
            }}
            variant="contained"
            color="primary"
            style={{ paddingLeft: "6%", paddingRight: "6%" }}
          >
            ALL
          </Button>
        </div>
        <MaterialTable
          title="Editable Example"
          columns={this.state.columns}
          options={{
            columnsButton: true,
            // headerStyle: { backgroundColor: 'blue', color: 'white' },
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            toolbarButtonAlignment: "right",
            searchFieldAlignment: "left",
            showTitle: false
          }}
          data={this.props.reduxStore.AttendeesCheckInReducer}
          actions={[
            {
              icon: "accessibility",
              tooltip: "Find this person`s personal info",
              onClick: (event, rowData) => {
                this.props.dispatch({
                  type: "FETCH_ATTENDEE_PERSONAL_INFO",
                  payload: rowData.AttendeeID
                });
                this.props.history.push(`/details`);
              }
            },
            rowData => ({
              icon: "group",
              tooltip: "Find all members of this group",
              onClick: (event, rowData) => {
                console.log(rowData.orderID);
                this.props.dispatch({
                  type: "FETCH_ORDER_INFO",
                  payload: rowData.orderID
                });
                this.props.history.push(`/OrderID`);
              },
              disabled: rowData.orderID == null
            }),
            rowData => ({
              icon: "check_circle",
              tooltip: "check this Attendee in!",
              onClick: (event, rowData) => {
let paymentPrompt = () => {
  if (
    window.confirm(
      "this person must submit payment to be checked into the convention"
    ) === true
  ) {
    checkInPrompt();
  } else {
    return false;
  }
};
let checkInPrompt = () => {
  if (
    window.confirm(
      "are you sure that you would like to check this person in?!"
    ) === true
  ) {
    console.log(rowData.AttendeeID);
    this.props.dispatch({
      type: "CHECK_IN_ATTENDEE",
      payload: rowData.orderID
    });
  } else {
    return false;
  }
};
                if (rowData.PaymentDate === null) {
                   paymentPrompt();
                } else {
                  checkInPrompt();
                }


              },
              disabled: rowData.CheckInDate !== null
            })
          ]}
          editable={{}}
        />
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};
export default connect(mapStateToProps)(CheckIn);
