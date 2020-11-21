import React, {useState, useRef, useEffect} from 'react';
import Event from "../../event";
import {connect} from "react-redux";
import moment from "moment";
import "./design.scss";
import {RootState} from "../../../store";
import {Dispatch} from "redux";
import EventView from "./event-view";
import EventViewDetailed from "./event-view-detailed";
import Category from "../../category";

interface Props {
  daySelected: moment.Moment;
  categories: Category[];
  events: Event[];
}

const EventContainer: React.FC<Props> = ({daySelected, events}) => {
  const [selectedEventId, setSelectedEventId] = useState(-1);

  function selectEvent(eventId: number) {
    if (selectedEventId == eventId) {
      // deselecting
      setSelectedEventId(-1);
    } else {
      setSelectedEventId(eventId);
    }
  }

  function getDayDivider() {
    const output = [];

    // Show events for the selected moment and the next 2 days.
    for (let i = 0; i < 3; i++) {
      const displayMoment = daySelected.clone().add(i, 'd');
      const eventsForMoment = Event.eventsForMoment(events, daySelected.clone().add(i, "day")).sort(Event.sortEvents);
      const key = displayMoment.toISOString();

      output.push(
        <div key={key}>
          <p className="default">{displayMoment.format("dddd, MMMM D")}</p>
          {eventsForMoment.map(event => {
            return (
              <React.Fragment key={"event" + event.id}>
                <EventView event={event} setSelected={selectEvent}/>
                {event.id === selectedEventId &&
                <EventViewDetailed event={event} close={() => setSelectedEventId(0)}/>}
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

function mapStateToProps(store: RootState) {
  return {
    daySelected: moment(store.calendar.momentSelected),
    events: store.calendar.events,
    categories: store.calendar.categories
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);