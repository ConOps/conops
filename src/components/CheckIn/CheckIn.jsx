import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';

class CheckIn extends Component {
    state = {
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            { title: 'Birth Place', field: 'birthCity', },
        ],
        data: [{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, }],
    }

    




    render() {
        return (
           
            <div>
                <h1 style={{ textAlign: 'center'}}>Convention: </h1>
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
                    editable={{
                        
                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise(resolve => {
                        //         setTimeout(() => {
                        //             resolve();
                        //             const data = [...this.state.data];
                        //             data[data.indexOf(oldData)] = newData;
                        //             this.setState({ ...this.state, data });
                        //         }, 600);
                        //     }),
                        
                    }}
                />

            </div>
           
        )
    }
}

const mapstatetoProps = (reduxStore) => {
    return {
        input: reduxStore.columnReducer
    }
}
export default connect(mapstatetoProps)(CheckIn);