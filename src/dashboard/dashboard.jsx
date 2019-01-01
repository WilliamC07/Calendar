import React, {Component} from 'react';
import Calendar from './calendar.jsx';
import Mail from './mail.jsx';
import Exit from './exit.jsx';
import Weather from './weather.jsx';
import ToDo from './todo.jsx';
import Money from './money.jsx';
import Notes from './notes.jsx';

class Dashboard extends Component{
    render() {
        return(
            <span>
                <span style={this.getTopStyle()}>
                    <span>
                        <Calendar/>
                        <Mail/>
                    </span>
                    <span>
                        <Weather/>
                    </span>
                </span>
                <span style={this.getBottomStyle()}>
                    <Exit/>
                    <ToDo/>
                    <Money/>
                    <Notes/>
                </span>
            </span>
        )
    }

    getTopStyle = () => {
        return{
            display: 'flex',
            flexDirection: 'row'
        }
    };

    getBottomStyle = () => {
        return{
            display: 'flex',
            flexDirection: 'row'
        };
    };
}

export default Dashboard;
