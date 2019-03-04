import React, {Component} from 'react';
import {connect} from 'react-redux';
import {equalDates, getMonthString} from './util';

class CalendarDay extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                {this.getLabelComponent()}
            </div>
        )
    };

    getLabelComponent = () => {
        const style = {margin: "0"};
        const date = this.props.date;
        let dateLabel = date.getDate();

        // Special markings
        if (equalDates(date, new Date())) {
            dateLabel += " - Today";
        } else if (date.getDate() === 1) {
            dateLabel += ` - ${getMonthString(date)}`;
        }

        return (
            <h3 style={style}>{dateLabel}</h3>
        );
    }
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar
    };
}

export default connect(mapStateToProps)(CalendarDay);