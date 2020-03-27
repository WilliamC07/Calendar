import React from 'react';
import CalendarBox from "./calendarBox";
import CategoryBox from "./category-box";
import NewEventViewerBox from "./eventViewer/newEventViewerBox";
import EventContainer from "./eventViewer/event-container";
import "./style.scss";

export default function Calendar(){
    return (
        <div className="calendarRoot">
            <div className="leftSide">
                <CalendarBox/>
                <CategoryBox/>
            </div>
            <div className="rightSide">
                <NewEventViewerBox/>
                <EventContainer/>
            </div>
        </div>
    )
}