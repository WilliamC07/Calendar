import React, {Component} from 'react';
import Calendar from './calendar.jsx';
import Mail from './mail.jsx';
import Exit from './exit.jsx';
import Weather from './weather.jsx';

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

                <Exit/>
            </span>
        )
    }

    getTopStyle = () => {
        return{
            display: 'flex',
            flexDirection: 'row'
        }
    }
}

export default Dashboard;
