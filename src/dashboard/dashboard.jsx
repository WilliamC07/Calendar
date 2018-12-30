import React, {Component} from 'react';
import Calendar from './calendar.jsx';
import Mail from './mail.jsx';

class Dashboard extends Component{
    render() {
        return(
            <span>
                <Calendar />
                <Mail />
            </span>
        )
    }
}

export default Dashboard;
