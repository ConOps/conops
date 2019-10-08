import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

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
    data: [
    ]
  };

  // componentDidMount() {
  //   getOrderId();
  // }

  // getOrderId = () => {
  //   this.props.dispatch({
  //     type: "FETCH_ORDER_INFO"
  //   });
  // }

  render() {
    return (
      <div>

        <h1 style={{ textAlign: "center" }}>Current Convention: 2DCON 2020</h1>
       
       
        <MaterialTable
          title="Editable Example"
          columns={this.state.columns}
          options={{
            columnsButton: true,
            selection: true,
            // headerStyle: { backgroundColor: 'blue', color: 'white' },
            pageSizeOptions: [10, 20, 50],
            toolbarButtonAlignment: "right",
            searchFieldAlignment: "left",
            showTitle: false
          }}
          actions={[{
            tooltip: 'Check-In All Selected Users',
            icon: 'check_box',
            onClick: (evt, rowData) => console.log(rowData.CheckInDate)
          }]}
          // onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
          data={this.props.reduxStore.AttendeesOrderIdReducer}
          editable={{}}
        />
        
        <Button variant="contained" color="secondary" style={{marginLeft: "3%", marginRight: "3%"}} onClick={() => this.props.history.push('/check-in')}>Back to Check In</Button>
        <Button variant="contained" color="primary">Check in Selected Guests!</Button>
      </div>
    );
  }
}

const mapStateToProps = (reduxStore) => {
  return {
    reduxStore
  }
}
export default connect(mapStateToProps)(OrderID);