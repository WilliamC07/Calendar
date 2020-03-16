import React from 'react';
import Event from "../../event";
import "../../../styles/calendar/_event-view.scss"
import {Moment} from "moment";

interface Props {
    event: Event;
}

const EventView: React.FC<Props> = ({event}) => {
    return (
        <div className="event-view">
            <TimeDisplay isAllDay={event.isAllDay} start={event.start} end={event.end}/>
            <div className="event-brief-overview">
                {event.title}
            </div>
        </div>
    )
};

interface TimeDisplayProps {
    isAllDay: boolean
    start: Moment,
    end: Moment
}
const TimeDisplay: React.FC<TimeDisplayProps> = ({isAllDay, start, end}) => {
    const timeFormat = "LT"; // Example: "04:30 PM"

    if(isAllDay){
        return <div className="event-time">All Day</div>
    }else{
        return (
            <div className="event-time">
                {start.format(timeFormat)}
                <br/>
                {end.format(timeFormat)}
            </div>
        )
    }
};

export default EventView;