import React, {Component} from 'react';
import Dashboard from './dashboard/dashboard.jsx';
import './index.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Possible views are: dashboard calendar money notes mail todos weather
            view: 'dashboard',
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.getView()}
            </React.Fragment>
        )
    }

    getView = () => {
        switch(this.state.view){
            case 'dashboard':
                return <Dashboard/>;
            default:
                return (
                    <h1>Don't know what view -- bug</h1>
                );
        }
    }
}

export default App;