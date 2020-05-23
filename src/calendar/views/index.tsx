import React from 'react';
import CategoryBox from "./category/category-creator";
import EventContainer from "./event-viewer/event-container";
import "./style.scss";
import {CornerCalendar} from "./corner-calendar/corner-calendar";
import EventCreator from "./event-creator/event-creator";

export default function Index(){
    return (
        <div className="calendarRoot">
            <div className="leftSide">
                <CornerCalendar/>
                <CategoryBox/>
            </div>
            <div className="rightSide">
                <EventCreator/>
                <EventContainer/>
            </div>
        </div>
    )
}