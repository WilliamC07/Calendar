import React, {Component} from 'react';
import Dashboard from './dashboard/dashboard.jsx';
import Calendar from './calendar/calendar';
import Notification from './notification/views/notification-container';
import './index.scss';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Possible views are: dashboard calendar money notes mail todos weather
            view: 'calendar',
        }
    }

    render() {
        return (
            <React.Fragment>
                <Notification/>
                <div className="mainViewContainer">
                    {this.getView()}
                </div>
            </React.Fragment>
        )
    }

    getView = () => {
        switch(this.state.view){
            case 'dashboard':
                return <Dashboard changeView={this.changeView}/>;
            case 'calendar':
                return <Calendar changeView={this.changeView}/>;
            case 'money':
                return <div>money</div>;
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