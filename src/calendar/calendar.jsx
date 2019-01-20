import React, {Component} from 'react';
import TopBar from '../components/topBar.jsx';

const util = require('./util.js');

class Calendar extends Component{
    constructor(props){
        super(props);

    }

    render() {
        // NavBar
        const information = {name: "Calendar"};

        return(
            <div>
                <TopBar information={information}/>

            </div>
        );
    }
}

export default Calendar;