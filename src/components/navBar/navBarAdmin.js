import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class NavBarAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }

        this.logOut = this.logOut.bind(this);

    }

    logOut() {
        localStorage.removeItem('lynnAdminEmail');
        this.props.history.push('/');
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark" expand="lg">
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item">
                        <span className="text-light">Lynn administrator application</span>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="text-light pull-right">connected as : {localStorage.getItem('lynnAdminEmail')}</span>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto row">
                    <li className="nav-item">
                        <button className="btn btn-danger pull-right mr-2 mb-2" onClick={this.logOut}>Log out</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBarAdmin;