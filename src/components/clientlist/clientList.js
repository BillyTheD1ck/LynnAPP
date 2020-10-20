import React from 'react';
import ListTableClients from './ListTableClients';
import NavBarAdmin from '../navBar/navBarAdmin';

class clientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
        
    }

    render() {
        return (
            <div>
                <NavBarAdmin history={this.props.history}/>
                <ListTableClients history={this.props.history}/>
            </div>
        );
    }
}


export default clientList;