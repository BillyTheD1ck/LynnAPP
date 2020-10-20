import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBarAdmin from '../navBar/navBarAdmin';
import axios from 'axios';

class clientInfos extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dataClient: '', savedDataClient: '', disabled: true};

        this.modify = this.modify.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
    }

    handleChangeName(event) {
        this.setState({ dataClient: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangeCountry(event) {
        this.setState({ country: event.target.value });
    }

    handleChangeCity(event) {
        this.setState({ city: event.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/listeClients/infosClient').then((res) => {
            this.setState({ dataClient: res.data });
            this.setState({ savedDataClient: res.data });
            console.log(res.data);
        }).catch((error) => { console.log(error) });
    }

    submitChanges() {
        console.log('submit changes');
        this.modify();
        this.setState( {savedDataClient: this.state.dataClient} );
    }

    modify() {
        this.setState( {disabled: !this.state.disabled} );
        this.setState( {dataClient: this.state.savedDataClient} );
    }

    render() {
        return (
            <div>
                <NavBarAdmin history={this.props.history} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 vertical-center-login">
                            <h2>Client id : <span className="badge badge-secondary">{this.state.dataClient.id}</span></h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="inputName">Name</label>
                                    <input type="email" className="form-control" id="inputName" value={this.state.dataClient.name} disabled = {(this.state.disabled)? "disabled" : ""} onChange={this.handleChangeName}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Email address</label>
                                    <input type="email" className="form-control" id="inputEmail" value={this.state.dataClient.email} disabled = {(this.state.disabled)? "disabled" : ""} onChange={this.handleChangeEmail}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputCountry">Country</label>
                                    <input type="email" className="form-control" id="inputCountry" value={this.state.dataClient.country} disabled = {(this.state.disabled)? "disabled" : ""} onChange={this.handleChangeCountry}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputCity">City</label>
                                    <input type="email" className="form-control" id="inputCity" value={this.state.dataClient.city} disabled = {(this.state.disabled)? "disabled" : ""} onChange={this.handleChangeCity}></input>
                                </div>
                                <button className="btn btn-success" onClick={this.submitChanges} hidden = {(this.state.disabled)? "hidden" : ""}>Validate</button>
                                <button className="btn btn-danger" onClick={this.modify} hidden = {(this.state.disabled)? "hidden" : ""}>discard</button>
                            </form>
                            <br/>
                            <button className="btn btn-primary" onClick={this.modify}>{(this.state.disabled)? "modify" : "stop modifying"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default clientInfos;