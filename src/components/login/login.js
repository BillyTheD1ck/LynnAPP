import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/login.css';
import axios from 'axios';
import auth from '../../authentication/auth';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', createEmail: '', createPassword: '', adminKey: '', visible: false }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeCreateEmail = this.handleChangeCreateEmail.bind(this);
        this.handleChangeCreatePassword = this.handleChangeCreatePassword.bind(this);
        this.handleChangeAdminKey = this.handleChangeAdminKey.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAdminAccount = this.createAdminAccount.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeCreateEmail(event) {
        this.setState({ createEmail: event.target.value });
    }

    handleChangeCreatePassword(event) {
        this.setState({ createPassword: event.target.value });
    }

    handleChangeAdminKey(event) {
        this.setState({ adminKey: event.target.value });
    }

    handleSubmit(event) {
        axios.post('http://localhost:8080/authentication', { email: this.state.email, password: this.state.password }).then((res) => {
            auth.login(() => {
                localStorage.setItem('lynnAdminEmail', this.state.email);
                this.props.history.push('/clientList');
            });
        }).catch((error) => {
            console.log(error);
        });
        event.preventDefault();
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    createAdminAccount(event) {
        console.log('account created');
        axios.post('http://localhost:8080/authentication/createAccount', { email: this.state.createEmail, password: this.state.createPassword, adminKey: this.state.adminKey }).then((res) => {
            auth.login(() => {
                this.props.history.push('/clientList');
            });
        }).catch((error) => {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 vertical-center-login">
                        <form onSubmit={this.handleSubmit}>
                            <h3>Administration app</h3>
                            <hr />
                            <div className="form-group">
                                <label>email</label>
                                <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChangeEmail} />
                            </div>

                            <div className="form-group">
                                <label>password</label>
                                <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChangePassword} />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">login</button>
                        </form>
                        <br />
                        <div>
                            <button onClick={this.show.bind(this)} className="btn btn-primary btn-block">create account</button>
                            <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} height={400}>
                                <div>
                                    <div>create new account</div>
                                    <br />
                                    <form onSubmit={this.createAdminAccount}>
                                        <div className="form-group">
                                            <label>email</label>
                                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.createEmail} onChange={this.handleChangeCreateEmail} />
                                        </div>

                                        <div className="form-group">
                                            <label>password</label>
                                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.createPassword} onChange={this.handleChangeCreatePassword} />
                                        </div>
                                        <div className="form-group">
                                            <label>admin Key</label>
                                            <input type="password" className="form-control" placeholder="Enter admin key" value={this.state.adminKey} onChange={this.handleChangeAdminKey} />
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-block">create account</button>
                                        </div>
                                    </form>
                                </div>
                            </Rodal>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Login;
