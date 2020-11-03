import React, {ChangeEvent, useEffect, useState} from "react";
import {connect} from 'react-redux';
import {RootState} from "../../../store";
import {Dispatch} from "redux";
import "./style.scss";
import {faChevronDown, faChevronUp, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Category from "../../category";
import {Moment} from "moment";
import * as calendarActions from "../../../store/calendar/actions";
import * as notificationActions from "../../../store/notification/actions";
import MomentPicker from "../util/moment-picker";
import TimePicker from "../util/time-picker";
import {Notification, NotificationType} from "../../../notification/notification";
import * as data from "../../../data/calendar/data";
import Event from "../../event";

interface Props {
  categories: Category[],
  momentSelected: Moment,
  createEvent: (newEvent: Event) => void,
  notify: (notification: Notification) => void,
}

const Component: React.FC<Props> = ({categories, momentSelected, notify, createEvent}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEventAllDay, setIsEventAllDay] = useState(true);
  const [areTimesValid, setAreTimesValid] = useState({
    start: true,
    end: true
  });
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    // no category is selected by default. Must be a string because HTML Select value can only be strings
    // corresponds to the chosen category id
    category: "-1",
    momentStart: momentSelected.clone(),
    momentEnd: momentSelected.clone(),
  });

  // make sure the chosen category hasn't been deleted
  useEffect(() => {
    if(categories.length === 0 || categories.filter(c => c.id === parseInt(eventDetails.category)).length === 0){
      // all categories have been deleted or the selected category has been deleted
      setEventDetails(prevState => {
        return {
          ...prevState,
          category: "-1"
        }
      })
    }
  }, [categories]);

  function handleEventDetailsChange(e: ChangeEvent<HTMLInputElement|HTMLSelectElement>){
    setEventDetails({
        ...eventDetails,
        [e.target.id]: e.target.value
      });
  }

  function handleClearDetails(){
    setEventDetails({
      title: "",
      description: "",
      category: "-1",
      momentStart: momentSelected.clone(),
      momentEnd: momentSelected.clone()
    })
  }

  function handleSetStartMoment(newMoment: Moment, isValid: boolean){
    setAreTimesValid(prevState => {
      return {
        ...prevState,
        start: isValid
      }
    });
    if(isValid){
      setEventDetails(prevState => {
        return {
          ...prevState,
          momentStart: newMoment
        }
      });
    }
  }

  function handleSetEndMoment(newMoment: Moment, isValid: boolean){
    setAreTimesValid(prevState => {
      return {
        ...prevState,
        end: isValid
      }
    });
    if(isValid){
      setEventDetails(prevState => {
        return {
          ...prevState,
          momentEnd: newMoment
        }
      });
    }
  }

  function handleCreateEvent(){
    if(!(areTimesValid.start && areTimesValid.end)){
      // one of the chosen times is invalid (missing/too many digits in hours or minutes field)
      notify(new Notification(NotificationType.ERROR, "Invalid starting/ending time"));
      return;
    }
    if(eventDetails.category === "-1"){
      notify(new Notification(NotificationType.ERROR, "Select a category for the event"));
      return;
    }

    try {
      const newEvent = new Event(eventDetails.title, eventDetails.description, parseInt(eventDetails.category), isEventAllDay,
        eventDetails.momentStart, eventDetails.momentEnd);
      createEvent(newEvent);
      notify(new Notification(NotificationType.SUCCESS, "Successfully created event!"));
      handleClearDetails();
    }catch(e){
      notify(new Notification(NotificationType.ERROR, e.message))
    }
  }

  return (
    <div className="event-creator-container default">
      <div className="event-creator-header">
        <h3>Create A New Event</h3>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} fixedWidth size="lg"
                         onClick={() => setIsExpanded(prevState => !prevState)}/>
      </div>

      {isExpanded &&
      <div>
        <div className="input-group">
          <label>Title:</label>
          <input type="text" id="title" value={eventDetails.title} onChange={handleEventDetailsChange}/>
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input type="text" id="description" value={eventDetails.description} onChange={handleEventDetailsChange}/>
        </div>
        <div className="input-group">
          <select className="success" id="category" value={eventDetails.category} onChange={handleEventDetailsChange}>
            <option value="-1">No Category Selected</option>
            {categories.map(c => <option key={`category${c.id}`} value={c.id}>{c.name}</option>)}
          </select>
          <span className="success ml-auto mr-2">{isEventAllDay ? "All Day Event" : "Timed Event"}</span>
        </div>
        <div className="input-group time-selection-container">
          <label>Start:</label>
          <MomentPicker startingMoment={eventDetails.momentStart} setSelectedMoment={handleSetStartMoment} isAbove={true}/>
          {!isEventAllDay && <TimePicker current={eventDetails.momentStart} update={handleSetStartMoment}/>}
          <button className={"" + (isEventAllDay ? "success" : "danger")} onClick={() => setIsEventAllDay(!isEventAllDay)}>
            <FontAwesomeIcon icon={isEventAllDay ? faPlus : faMinus} fixedWidth/>
          </button>
        </div>
        <div className="input-group time-selection-container">
          <label>End:</label>
          <MomentPicker startingMoment={eventDetails.momentEnd} setSelectedMoment={handleSetEndMoment} isAbove={false}/>
          {!isEventAllDay && <TimePicker current={eventDetails.momentEnd} update={handleSetEndMoment}/>}
          <button className={"" + (isEventAllDay ? "success" : "danger")} onClick={() => setIsEventAllDay(!isEventAllDay)}>
            <FontAwesomeIcon icon={isEventAllDay ? faPlus : faMinus} fixedWidth/>
          </button>
        </div>
        <div className="input-group">
          <button className="success" onClick={handleCreateEvent}>Create</button>
          <button className="danger" onClick={handleClearDetails}>Clear</button>
        </div>
      </div>}
    </div>
  )
};

function mapStateToProps(store: RootState){
  return {
    categories: store.calendar.categories,
    momentSelected: store.calendar.momentSelected
  }
}

function mapDispatchToProps(dispatch: Dispatch){
  return {
    createEvent: (newEvent: Event) => {
      data.createEvent(newEvent);
      dispatch(calendarActions.createEvent(newEvent));
    },
    notify: (notification: Notification) => dispatch(notificationActions.notify(notification))
  }
}

const EventCreator = connect(mapStateToProps, mapDispatchToProps)(Component);
export default EventCreator;