import React from 'react';
import Event from "../../event";
import "../../../styles/calendar/_event-view.scss"

interface Props {
    event: Event;
}

const EventView: React.FC<Props> = ({event}) => {
    return (
        <div className="event-view">
            <div className="event-time">
                {event.start.toISOString()}
            </div>
            <div className="event-brief-overview">
                {event.title}
            </div>
        </div>
    )
};

export default EventView;