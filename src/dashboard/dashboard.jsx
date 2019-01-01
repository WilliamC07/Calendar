import React, {Component} from 'react';
import Calendar from './calendar.jsx';
import Mail from './mail.jsx';
import Exit from './exit.jsx';

class Dashboard extends Component{
    render() {
        return(
            <span>
                <Calendar/>
                <Mail/>
                <Exit/>
            </span>
        )
    }
}

export default Dashboard;
