import React, {useState, useRef, useEffect} from 'react';
import Event from "../../event";
import {connect} from "react-redux";
import moment from "moment";
import "./design.scss";
import {ApplicationState} from "../../../store";
import {Dispatch} from "redux";
import EventView from "./event-view";
import EventViewDetailed from "./event-view-detailed";

interface Props {
    daySelected: moment.Moment;
    events: Event[]
}

const EventContainer: React.FC<Props> = ({daySelected, events}) => {
    const [selectedEventID, setSelectedEventID] = useState(-1);

    function getDayDivider(){
        const output = [];

        // Show events for the selected moment and the next 2 days.
        for(let i = 0; i < 3; i++){
            const displayMoment = daySelected.clone().add(i, 'd');
            const eventsForMoment = Event.eventsForMoment(events, daySelected.clone().add(i, "day")).sort(Event.sortEvents);

            output.push(
                <div key={displayMoment.toISOString()}>
                    <p>{displayMoment.format("dddd, MMMM D")}</p>
                    {eventsForMoment.map(event => {
                        return (
                            <React.Fragment key={"event" + event.id}>
                                <EventView event={event} setSelected={() => setSelectedEventID(event.id)}/>
                                { event.id === selectedEventID && <EventViewDetailed event={event} close={() => setSelectedEventID(-1)}/>}
                            </React.Fragment>
                        )
                    })}
                </div>
            )
        }

        return output;
    }

    return (
        <div className="eventViewerContainer">
            {getDayDivider()}
        </div>
    )
};

function mapStateToProps(store: ApplicationState){
    return {
        daySelected: store.calendar.daySelected,
        events: store.calendar.events
    }
}

function mapDispatchToProps(dispatch: Dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);