import React, {useState} from 'react';
import {connect} from 'react-redux';
import CalendarBox from "./calendarBox";
import CategoryBox from "./categoryBox";
import NewEventViewerBox from "./eventViewer/newEventViewerBox";
import EventContainer from "./eventViewer/eventContainer";
import "./style.scss";

function CalendarConnect(props) {
    return (
        <div className="calendarRoot">
            <CalendarBox/>
            <CategoryBox/>
            <NewEventViewerBox/>
            <EventContainer/>
        </div>
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