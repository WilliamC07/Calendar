import React, {useState, useRef, useEffect} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import "./design.scss";

function EventContainerConnect({daySelected, events}){
    function getDayDivider(){
        const output = [];
        console.log("events read:");
        console.log(events);

        for(let i = 0; i < 3; i++){
            const displayMoment = daySelected.clone().add(i, 'd');
            const eventsForMoment = events.filter(event => {
                const start = moment(event.start).startOf('day');
                const end = moment(event.end).endOf('day');
                return displayMoment.isBetween(start, end);
            });

            output.push(
                <div key={displayMoment.toISOString()}>
                    <p>{displayMoment.format("dddd, MMMM D")}</p>
                    {eventsForMoment.map(event => <EventBox key={"event" + event.id} event={event}/>)}
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
}

function EventBox({event}){
    return (
        <div>
            <p>{event.title}</p>
            <p>{event.description}</p>
        </div>
    )
}

function mapStateToProps(store){
    return {
        daySelected: store.calendar.daySelected,
        events: store.calendar.events
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}

const EventContainer = connect(mapStateToProps, mapDispatchToProps)(EventContainerConnect);

export default EventContainer;