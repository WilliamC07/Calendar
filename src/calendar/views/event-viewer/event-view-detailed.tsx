import React, {ChangeEvent, useState} from 'react';
import Event from "../../event";
import {Moment} from "moment";
import MomentPicker from "../util/moment-picker";
import TimePicker from "../util/time-picker";
import Category from "../../category";
import * as data from "../../../data/calendar/data";
import * as calendar_actions from "../../../store/calendar/actions";
import {RootState} from "../../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Notification, NotificationType} from "../../../notification/notification";
import "../../../styles/forms.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import { createNotification } from '../../../store/notification/actions';

interface Props {
  event: Event;
  categories: Category[];
  updateEvent: (event: Event) => void;
  notify: (notification: Notification) => void;
  close: () => void;
}

const EventViewDetailedConnect: React.FC<Props> = ({event, close, categories, updateEvent, notify}) => {
  const [isEventAllDay, setIsEventAllDay] = useState(event.isAllDay);
  const [areTimesValid, setAreTimesValid] = useState({
    start: true,
    end: true
  });
  const [eventDetails, setEventDetails] = useState({
    title: event.title,
    description: event.description,
    category: event.category,
    momentStart: event.start,
    momentEnd: event.end,
  });

  function handleEventDetailsChange(e: ChangeEvent<HTMLInputElement|HTMLSelectElement>){
    setEventDetails({
      ...eventDetails,
      [e.target.id]: e.target.value
    });
  }

  function handleResetDetails(){
    setEventDetails({
      title: event.title,
      description: event.description,
      category: event.category,
      momentStart: event.start,
      momentEnd: event.end,
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

  function handleUpdateEvent(){
    if(!(areTimesValid.start && areTimesValid.end)){
      // one of the chosen times is invalid (missing/too many digits in hours or minutes field)
      notify(new Notification(NotificationType.ERROR, "Invalid starting/ending time"));
      return;
    }
    try{
      const newEvent = new Event(eventDetails.title, eventDetails.description, eventDetails.category, isEventAllDay,
        eventDetails.momentStart, eventDetails.momentEnd);
      // manually set since we are modifying
      newEvent.id = event.id;
      updateEvent(newEvent);
      notify(new Notification(NotificationType.SUCCESS, "Successfully updated event!"));
    }catch(e){
      notify(new Notification(NotificationType.ERROR, e.message))
    }
  }

  function handleDeleteEvent(){
    throw new Error("Not implemented");
  }

  return (
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
        <button className="success" onClick={handleUpdateEvent}>Update</button>
        <button className="danger" onClick={handleResetDetails}>Reset</button>
        <button className="danger" onClick={handleDeleteEvent}>Delete</button>
        <button className="danger" onClick={close}>Close</button>
      </div>
    </div>
  )
};

function mapStateToProps(store: RootState) {
  return {
    categories: store.calendar.categories
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    /**
     * @param event Should be a new instance of Event
     */
    updateEvent: (event: Event) => {
      data.updateEvent(event);
      dispatch(calendar_actions.updateEvent(event));
    },
    notify: (notification: Notification) => {
      dispatch(createNotification(notification));
    }
  }
}

const EventViewDetailed = connect(mapStateToProps, mapDispatchToProps)(EventViewDetailedConnect);

export default EventViewDetailed;