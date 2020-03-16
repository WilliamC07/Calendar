import React from 'react';
import Event from "../../event";

interface Props {
    event: Event;
    close: () => void;
}
const EventViewDetailed: React.FC<Props> = ({event, close}) => {
    return (
        <div>
            {event.description}
            <button onClick={close}>Close</button>
        </div>
    )
};

export default EventViewDetailed;