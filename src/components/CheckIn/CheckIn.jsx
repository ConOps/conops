import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class CheckIn extends Component {
    state = {
        columns: [
            { title: 'AttendeeID', field: 'AttendeeID' },
            { title: 'ConventionID', field: 'ConventionID' },
            { title: 'First Name', field: 'FirstName' },
            { title: 'Last Name', field: 'LastName' },
            { title: 'Middle Name', field: 'MiddleName' },
            { title: 'Address Line One', field: 'AddressLineOne' },
            { title: 'Address Line Two', field: 'AddressLineTwo' },
            { title: 'City', field: 'City' },
            { title: 'State/Province', field: 'StateProvince' },
            { title: 'Postal Code', field: 'PostalCode' },
            { title: 'CountryID', field: 'CountryID' },
            { title: 'Email Address', field: 'EmailAddress' },
            { title: 'Phone Number', field: 'PhoneNumber' },
            { title: 'Date Of Birth', field: 'DateOfBirth' },
            { title: 'Badge Name', field: 'BadgeName' },
            { title: 'Registration Date', field: 'RegistrationDate' },
            { title: 'Check-In date', field: 'CheckInDate' },
            { title: 'Payment Date', field: 'PaymentDate' },
            { title: 'Badge Type ID', field: 'BadgeTypeID' },
            { title: 'Badge Number', field: 'BadgeNumber' },
            { title: 'Printed', field: 'Printed' },
            { title: 'Discord Verified', field: 'DiscordVerified' },
            { title: 'Pre Reg Sort Number', field: 'PreRegSortNumber' },
            { title: 'OrderID', field: 'OrderID', render: rowData => (
                <Button>View OrderID</Button>
            )  },
        ],
        data: [{ AttendeeID: '', ConventionID: '', FirstName: '', LastName: '', MiddleName: '', AddressLineOne: '', AddressLineTwo: '', City: '', StateProvince: '', PostalCode: '', CountryID: '', EmailAddress: '', PhoneNumber: '', DateOfBirth: '', BadgeName: '', RegistrationDate: '', CheckInDate: '', PaymentDate: '', BadgeTypeID: '', BadgeNumber: '', Printed: '', DiscordVerified: '', PreRegSortNumber: '', OrderID: '' }],
    }

    




    render() {
        // this.props.attendeescheckin.map((attendee) => {
        //     return (
        //         this.setState({
        //             ...this.state.data,
        //             AttendeeID: attendee.AttendeeID,
        //             ConventionID: attendee.ConventionID,
        //             FirstName: attendee.FirstName,
        //             LastName: attendee.LastName,
        //             MiddleName: attendee.MiddleName,
        //             AddressLineOne: attendee.AddressLineOne,
        //             AddressLineTwo: attendee.AddressLineTwo,
        //             City: attendee.City,
        //             StateProvince: attendee.StateProvince,
        //             PostalCode: attendee.PostalCode,
        //             CountryID: attendee.CountryID,
        //             EmailAddress: attendee.EmailAddress,
        //             PhoneNumber: attendee.PhoneNumber,
        //             DateOfBirth: attendee.DateOfBirth,
        //             BadgeName: attendee.BadgeName,
        //             RegistrationDate: attendee.RegistrationDate,
        //             CheckInDate: attendee.CheckInDate,
        //             PaymentDate: attendee.PaymentDate,
        //             BadgeTypeID: attendee.BadgeTypeID,
        //             BadgeNumber: attendee.BadgeNumber,
        //             Printed: attendee.Printed,
        //             DiscordVerified: attendee.DiscordVerified,
        //             PreRegSortNumber: attendee.PreRegSortNumber,
        //             OrderID: attendee.OrderID
        //         })

        //     )
        // })
        return (
           
            <div>
                <h1 style={{ textAlign: 'center' }}>Current Convention: 2DCON 2020</h1>
                <p style={{ textAlign: 'center' }}>FILTER</p>
                <div style={{textAlign: 'center'}}>
                    <Button variant="contained" color="primary" style={{ paddingLeft: '6%', paddingRight: '6%', marginRight: '5%' }}>CHECKED-IN</Button>
                    <Button variant="contained" color="primary" style={{ paddingLeft: '6%', paddingRight: '6%', marginRight: '5%'}}>PRE-REGISTERED</Button>
                    <Button variant="contained" color="primary" style={{ paddingLeft: '6%', paddingRight: '6%', marginRight: '5%'}}>WALK-IN</Button>
                    <Button variant="contained" color="primary" style={{ paddingLeft: '6%', paddingRight: '6%'}}>ALL</Button>
                </div>
                <MaterialTable
                    title="Editable Example"
                    columns={this.state.columns}
                    options={{
                        selection: true,
                        columnsButton: true,
                        // headerStyle: { backgroundColor: 'blue', color: 'white' },
                        pageSizeOptions: [10, 20, 50],
                        toolbarButtonAlignment: 'right',
                        searchFieldAlignment: 'left',
                        showTitle: false,
                    }}
                    onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh Data',
                            isFreeAction: true,
                            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                        }
                    ]}
                    data={this.state.data}
                    editable={{}}
                />

            </div>
           
        )
    }
}

const mapstatetoProps = (reduxStore) => {
    return {
        attendeescheckin: reduxStore.AttendeesCheckInReducer
    }
}
export default connect(mapstatetoProps)(CheckIn);