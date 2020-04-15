import React from 'react';
import CalendarBox from "./calendar/calendarBox";
import CategoryBox from "./category/category-box";
import NewEventViewerBox from "./event-creator/newEventViewerBox";
import EventContainer from "./event-viewer/event-container";
import "./style.scss";

export default function Index(){
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