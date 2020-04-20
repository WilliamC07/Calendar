import React from 'react';
import CategoryBox from "./category/category-creator";
import NewEventViewerBox from "./event-creator/newEventViewerBox";
import EventContainer from "./event-viewer/event-container";
import "./style.scss";
import {CornerCalendar} from "./corner-calendar/corner-calendar";

export default function Index(){
    return (
        <div className="calendarRoot">
            <div className="leftSide">
                <CornerCalendar/>
                <CategoryBox/>
            </div>
            <div className="rightSide">
                <NewEventViewerBox/>
                <EventContainer/>
            </div>
        </div>
    )
}