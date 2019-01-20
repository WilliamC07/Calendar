import React, {Component} from 'react';
import Dashboard from './dashboard/dashboard.jsx';
import Calendar from './calendar/calendar.jsx';
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
                return <Dashboard changeView={this.changeView}/>;
            case 'calendar':
                return <Calendar changeView={{this.changeView}}/>;
            default:
                return (
                    <h1>Don't know what view -- bug {this.state.view}</h1>
                );
        }
    };

    changeView = (newView) => {
        this.setState({view: newView});
    };
}

export default App;