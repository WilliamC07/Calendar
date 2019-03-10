import React, {Component} from 'react';
import {getFirstSunday} from './util';
import {connect} from 'react-redux';
import CalendarDay from './calendarDateComponent'

class Calendar extends Component{
    render() {
        const wrapperStyle = {
            display: "flex",
            flexDirection: "column",
            height: 'auto'
        };
        const calendarGridStyle = {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            flexGrow: "1",
            position: "relative"
        };

        return(
            <div style={wrapperStyle}>
                <div style={calendarGridStyle}>
                    {this.daysOfWeekComponents()}
                    {this.daysOfMonthComponents()}
                </div>
            </div>
        )
    }

    daysOfWeekComponents(){
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((name, index) => {
           return (
                <h1 style={{textAlign: "center"}} key={index}>{name}</h1>
           )
        });
    };

    daysOfMonthComponents(){
        const parts = [];
        const baseDate = getFirstSunday(this.props.calendar.dateDisplaying);
        for(let dateComponentIndex = 0; dateComponentIndex < 7 * 6; dateComponentIndex++){
            const dateComponentDate = new Date(baseDate);
            dateComponentDate.setDate(dateComponentDate.getDate() + dateComponentIndex);

            parts.push(
                <CalendarDay date={dateComponentDate} key={dateComponentIndex} index={dateComponentIndex}/>
            )
        }
        return parts;
    }
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar
    };
}

export default connect(mapStateToProps)(Calendar);