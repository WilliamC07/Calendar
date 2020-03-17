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

        const sortedEvents = events.slice().sort(Event.sortEvents);

        for(let i = 0; i < 3; i++){
            const displayMoment = daySelected.clone().add(i, 'd');
            const eventsForMoment = sortedEvents.filter(event => {
                const start = moment(event.start).startOf('day');
                const end = moment(event.end).endOf('day');
                return displayMoment.isBetween(start, end);
            });

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