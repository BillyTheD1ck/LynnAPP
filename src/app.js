import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './authentication/protectedRoute';
import login from "./components/login/login";
import clientInfos from "./components/clientInfos/clientInfos";
import createClient from "./components/createClient/createClient";
import clientList from "./components/clientlist/clientList";
import createContact from "./components/createContact/createContact";


const Error = () => {
    return (
        <div>
            <p>Error</p>
        </div>
    );
};

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route path="/" component={login} exact />
                <ProtectedRoute path="/clientInfos" component={clientInfos} />
                <ProtectedRoute path="/createClient" component={createClient} />
                <ProtectedRoute path="/createContact" component={createContact} />
                <ProtectedRoute path="/clientList" component={clientList} />
                <Route component={Error} />
            </Switch>
            </BrowserRouter>
        );
    }
}

export default App;