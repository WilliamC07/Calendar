import React, {useState} from 'react';
import {connect} from 'react-redux';
import CalendarBox from "./calendarBox";
import "./style.scss";

function CalendarConnect(props) {
    return (
        <CalendarBox>

        </CalendarBox>
    );
}

function mapStateToProps() {
    return {

    }
}

function mapDispatchToProps() {
    return {

    }
}

const Calendar = connect(mapStateToProps, mapDispatchToProps)(CalendarConnect);
export default Calendar;