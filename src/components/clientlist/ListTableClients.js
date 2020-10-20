import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class ListTableClients extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gripOptions: {},
      columnDefs: [],
      columnDefsClients: [
        { headerName: "id", field: "id", maxWidth: 100 },
        { headerName: "name", field: "name" },
        { headerName: "email", field: "email" }
      ],

      columnDefsContacts: [
        { headerName: "id", field: "id", maxWidth: 100 },
        { headerName: "email", field: "email" },
        { headerName: "name", field: "name" },
        { headerName: "last name", field: "lastName" },
        { headerName: "phone number", field: "phoneNumber" },
        { headerName: "idClient", field: "idClient", maxWidth: 120 }
      ],

      dataDisplayed: 'client',
      switchButtonName: 'show contacts list',
      creationButtonName: 'new client',

      rowDataClients: null,
      rowDataContacts: null,
      rowData: null,
      rowHeight: 275,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
      }
    };

    this.switchDataDisplayed = this.switchDataDisplayed.bind(this);
    this.createRedirect = this.createRedirect.bind(this);
  }

  createRedirect() {
    if (this.state.dataDisplayed === 'client') {
      this.props.history.push('/createClient');
    } else if (this.state.dataDisplayed === 'contact') {
      this.props.history.push('/createContact');
    }
  }

  switchDataDisplayed() {
    if (this.state.dataDisplayed === 'client') {
      this.setState({ dataDisplayed: 'contact' });
      this.setState({ switchButtonName: 'show clients list' });
      this.setState({ creationButtonName: 'new contact' });
      this.setState({ rowData: this.state.rowDataContacts });
      this.setState({ columnDefs: this.state.columnDefsContacts });
    }
    else if (this.state.dataDisplayed === 'contact') {
      this.setState({ dataDisplayed: 'client' });
      this.setState({ switchButtonName: 'show contacts list' });
      this.setState({ creationButtonName: 'new client' });
      this.setState({ rowData: this.state.rowDataClients });
      this.setState({ columnDefs: this.state.columnDefsClients });
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    axios.get('http://localhost:8080/listeClients').then((res) => {
      this.setState({ rowDataClients: res.data });
      this.setState({ rowData: res.data });
    }).catch((error) => { console.log(error) });
    axios.get('http://localhost:8080/listeContacts').then((res) => {
      this.setState({ rowDataContacts: res.data });
    }).catch((error) => { console.log(error) });

    this.setState({ columnDefs: this.state.columnDefsClients });
  };

  onFilterTextBoxChanged = e => {
    const value = e.target.value;

    this.gridApi.setQuickFilter(value);
  };

  render() {
    return (
      <div style={{ width: "100%", paddingLeft: '50px', paddingRight: '50px', paddingTop: '50px' }}>
        <div className="input-group">
          <div className="col-md-6">
            <input type="text" className="form-control" style={{ width: "200px" }} placeholder="Filter..." onInput={this.onFilterTextBoxChanged} />
          </div>
          <div className="col-md-6">
            <button className="btn btn-secondary float-right !important mr-2 mb-2" onClick={this.switchDataDisplayed}>{this.state.switchButtonName}</button>
            <button className="btn btn-primary float-right !important mr-2 mb-2" onClick={this.createRedirect}>{this.state.creationButtonName}</button>
          </div>
        </div>
        <div id="myGrid" style={{ height: "100%", width: "100%" }} className="ag-theme-alpine">
          <br />
          <AgGridReact
            domLayout='autoHeight'
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            suppressMenuHide={true}
            frameworkComponents={this.state.frameworkComponents}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady} />
        </div>
      </div>
    );
  }
}

export default ListTableClients;