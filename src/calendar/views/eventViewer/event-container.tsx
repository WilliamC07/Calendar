import React, {useState, useRef, useEffect} from 'react';
import Event from "../../event";
import {connect} from "react-redux";
import moment from "moment";
import "./design.scss";
import {ApplicationState} from "../../../store";
import {Dispatch} from "redux";
import EventView from "./event-view";

interface Props {
    daySelected: moment.Moment;
    events: Event[]
}

const EventContainer: React.FC<Props> = ({daySelected, events}) => {
    function getDayDivider(){
        const output = [];

        const sortedEvents = events.slice().sort((e1, e2) => {
            if(e1.isAllDay && !e2.isAllDay){
                return -1;
            }else if(e1.isAllDay && e2.isAllDay){
                return e1.title.localeCompare(e2.title);
            }else if(e1.start.isSame(e2.start)){
                // same starting time, so compare id for continuity of previous day event list
                return e1.id - e2.id;
            }else{
                // different starting time, so list earlier one first
                return e1.start.isAfter(e2.start) ? -1 : 1;
            }
        });

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
                    {eventsForMoment.map(event => <EventView key={"event" + event.id} event={event}/>)}
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