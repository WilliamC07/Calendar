import React, {useState} from 'react';
import Event from "../../event";
import {Moment} from "moment";
import MomentPicker from "../moment-picker";
import TimePicker from "../time-picker";
import Category from "../../category";
import * as data from "../../../data/calendar/data";
import * as calendar_actions from "../../../store/calendar/actions";
import * as notification_actions from "../../../store/notification/actions";
import {ApplicationState} from "../../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Notification, NotificationType} from "../../../notification/notification";

interface Props {
    event: Event;
    categories: Category[];
    updateEvent: (event: Event) => void;
    notify: (notification: Notification) => void;
    close: () => void;
}
const EventViewDetailedConnect: React.FC<Props> = ({event, close, categories, updateEvent, notify}) => {
    const [eventInfo, setEventInfo] = useState({
        title: event.title,
        description: event.description,
        category: event.category,
        isAllDay: event.isAllDay,
        momentStart: event.start.clone(),
        momentEnd: event.end.clone()
    });

    const handleEventInfo = (e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(e.currentTarget.name === "category"){
            // html stores everything as a string, but we need an number value for category id
            setEventInfo({...eventInfo, "category": parseInt(e.currentTarget.value)});
        }else if(e.currentTarget.name === "toggleAllDay"){
            e.preventDefault();
            setEventInfo({...eventInfo, "isAllDay": !eventInfo.isAllDay});
        }else{
            setEventInfo({...eventInfo, [e.currentTarget.name]: e.currentTarget.value});
        }
    };
    const setStartingMoment = (momentStart: Moment) => {
        setEventInfo({
            ...eventInfo,
            momentStart
        })
    };
    const setEndingMoment = (momentEnd: Moment) => {
        setEventInfo({
            ...eventInfo,
            momentEnd
        })
    };
    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        close();
    };
    const handleDelete = () => {

    };
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            const newEvent = new Event(eventInfo.title, eventInfo.description, eventInfo.category, eventInfo.isAllDay, eventInfo.momentStart, eventInfo.momentEnd);
            newEvent.id = event.id;
            updateEvent(newEvent);
        }catch(e){
            // Failed to create event
            notify(new Notification(NotificationType.ERROR, e.message))
        }
        e.preventDefault();
    };

    return (
        <form className="makerContainer">
            <div className="formGroup">
                <label>Title</label>
                <input onChange={handleEventInfo} value={eventInfo.title} name="title" type="text" placeholder="New Event Title"/>
            </div>
            <div className="formGroup">
                <label>Description</label>
                <input onChange={handleEventInfo} value={eventInfo.description} name="description" type="text" placeholder="New Event Description"/>
            </div>
            <div className="formGroup">
                <label>Category</label>
                <select onChange={handleEventInfo} value={eventInfo.category} name="category">
                    {categories.map(category => <option value={category.id}
                                                        key={"category" + category.id}>{category.name}</option>)}
                </select>
            </div>
            <div className="formGroup">
                <button name="toggleAllDay" onClick={handleEventInfo}>{eventInfo.isAllDay ? "All day" : "Timed"}</button>
            </div>
            <div className="eventCreatorTimeField">
                <div className="formGroup">
                    <label>Start Date</label>
                    <MomentPicker startingMoment={eventInfo.momentStart} setSelectedMoment={setStartingMoment} isAbove={true}/>
                </div>
                {!eventInfo.isAllDay &&
                <div className="formGroup">
                    <label>Time start</label>
                    <TimePicker current={eventInfo.momentStart} update={(newMoment) => setEventInfo({...eventInfo, momentStart: newMoment})}/>
                </div>
                }
            </div>
            <div>
                <div className="formGroup">
                    <label>End Date</label>
                    <MomentPicker startingMoment={eventInfo.momentEnd} setSelectedMoment={setEndingMoment} isAbove={false}/>
                </div>
                {!eventInfo.isAllDay &&
                <div className="formGroup">
                    <label>Time end</label>
                    <TimePicker current={eventInfo.momentEnd} update={(newMoment) => setEventInfo({...eventInfo, momentEnd: newMoment})}/>
                </div>
                }
            </div>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </form>
    )
};

function mapStateToProps(store: ApplicationState){
    return {

    }
}

function mapDispatchToProps(dispatch: Dispatch){
    return {
        /**
         * @param event Should be a new instance of Event
         */
        updateEvent: (event: Event) => {
            data.updateEvent(event);
            dispatch(calendar_actions.updateEvent(event));
        },
        notify: (notification: Notification) => {
            dispatch(notification_actions.notify(notification));
        }
    }
}

const EventViewDetailed = connect(mapStateToProps, mapDispatchToProps)(EventViewDetailedConnect);

export default EventViewDetailed;