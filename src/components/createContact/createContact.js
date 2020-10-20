import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import NavBarAdmin from '../navBar/navBarAdmin';

class createClient extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', lastName: '', phoneNumber: '', mail: '', password: '' , contactStatus: ''}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleMail = this.handleMail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleContactStatus = this.handleContactStatus.bind(this);
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    handlePhoneNumber(event) {
        this.setState({ phoneNumber: event.target.value });
    }

    handleMail(event) {
        this.setState({ mail: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleContactStatus(event) {
        this.setState({ contactStatus: event.target.value });
    }

    handleSubmit(event) {
        axios.post('http://localhost:8080/listeClients/createContact', 
        { name: this.state.name, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber, mail: this.state.mail, password: this.state.password, contactStatus: this.state.contactStatus }).then((res) => {
            this.props.history.push('/clientList');
        }).catch((error) => {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <NavBarAdmin history={this.props.history}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <form onSubmit={this.handleSubmit} autocomplete="off">
                                <div className="form-group">
                                    <label for="clientName">name :</label>
                                    <input type="text" className="form-control" placeholder="type here..." value={this.state.name} onChange={this.handleName} />
                                </div>
                                <div className="form-group">
                                    <label for="clientName">last name :</label>
                                    <input type="text" className="form-control" placeholder="type here..." value={this.state.lastName} onChange={this.handleLastName} />
                                </div>
                                <div className="form-group">
                                    <label for="clientName">Phone number :</label>
                                    <PhoneInput value={this.state.phoneNumber} onChange={phoneNumber => this.setState({ phoneNumber })}/>
                                </div>
                                <div className="form-group">
                                    <label for="mailAddress">mail address :</label>
                                    <input type="mail" className="form-control" autocomplete="false" placeholder="type here..." value={this.state.mail} onChange={this.handleMail} />
                                </div>
                                <div className="form-group">
                                    <label for="password">contact status :</label>
                                    <select className="form-control" value={this.state.contactStatus} onChange={this.handleContactStatus}>
                                        <option value="boss">boss</option>
                                        <option value="manager">manager</option>
                                        <option value="bartender">bartender</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="password">Password :</label>
                                    <input type="password" className="form-control" autocomplete="false" placeholder="type here..." value={this.state.password} onChange={this.handlePassword} />
                                </div>
                                <div className="form-group">
                                    <input className="btn btn-success" type="submit" value="Create"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default createClient;