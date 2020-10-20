import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import NavBarAdmin from '../navBar/navBarAdmin';

class createClient extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '' , mail: '', password: ''}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleMail = this.handleMail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleName(event) {
        this.setState({name: event.target.value});
      }

      handleMail(event) {
        this.setState({mail: event.target.value});
      }

      handlePassword(event) {
        this.setState({password: event.target.value});
      }

    handleSubmit(event) {
        axios.post('http://localhost:8080/listeClients/createClient', { name: this.state.name, mail: this.state.mail, password: this.state.password }).then((res) => {
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
                                    <label for="clientName">client name :</label>
                                    <input type="text" className="form-control" placeholder="type here..." value={this.state.name} onChange={this.handleName}/>
                                </div>
                                <div className="form-group">
                                    <label for="mailAddress">mail address :</label>
                                    <input type="mail" className="form-control" autocomplete="false" placeholder="type here..." value={this.state.mail} onChange={this.handleMail}/>
                                </div>
                                <div className="form-group">
                                    <label for="password">Password :</label>
                                    <input type="password" className="form-control" autocomplete="false" placeholder="type here..." value={this.state.password} onChange={this.handlePassword}/>
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