import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Calendar extends Component{
    render() {
        return(
            <div>
                {this.daysOfWeekComponents()}
            </div>
        )
    }

    daysOfWeekComponents(){
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((name, index) => {
           return (
                <h1 style={{textAlign: "center"}} key={index}>{name}</h1>
           )
        });
    }
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar
    };
}

export default Calendar;