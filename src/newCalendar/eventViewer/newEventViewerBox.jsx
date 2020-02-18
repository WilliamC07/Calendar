import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons/faChevronUp";
import "./design.scss";
import * as actions from "../../store/calendar/actions";
import {notify} from "../../store/notification/actions"
import * as data from "../../data/calendar/data";
import {connect} from "react-redux";
import MomentPicker from "../momentPicker";
import {NotificationObject, NotificationType} from "../../notification/NotificationObject";
import TimePicker from "../timePicker";

function NewEventViewerBoxConnect({categories, daySelected, createEvent, notify}) {
    const [expanded, setExpanded] = useState(true); // true for testing
    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        category: categories.length === 0 ? 0 :categories[0].id, // default category to the first one
        isAllDay: true,
        momentStart: daySelected.clone(),
        momentEnd: daySelected.clone()
    });

    useEffect(() => {
        // there weren't any categories before and the user just created one. use the newly created category as default
        if(eventInfo.category === 0 && categories.length !== 0){
            setEventInfo({...eventInfo, "category": categories[0].id})
        }
    }, [categories]);

    const handleEventInfo = (e) => {
        if(e.target.name === "category"){
            // html stores everything as a string, but we need an number value for category id
            setEventInfo({...eventInfo, "category": parseInt(e.target.value)});
        }else if(e.target.name === "toggleAllDay"){
            e.preventDefault();
            setEventInfo({...eventInfo, "isAllDay": !eventInfo.isAllDay});
        }else{
            setEventInfo({...eventInfo, [e.target.name]: e.target.value});
        }
    };

    const setStartingMoment = (momentStart) => {
        setEventInfo({
            ...eventInfo,
            momentStart
        })
    };

    const setEndingMoment = (momentEnd) => {
        setEventInfo({
            ...eventInfo,
            momentEnd
        })
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if(eventInfo.title.trim().length === 0){
            notify(new NotificationObject(NotificationType.ERROR, "New event requires a title!"));
            return;
        }else if(eventInfo.momentEnd.isBefore(eventInfo.momentStart)){
            notify(new NotificationObject(NotificationType.ERROR, "End date must be after start date!"));
            return;
        }else if(eventInfo.category === 0){
            notify(new NotificationObject(NotificationType.ERROR, "No category chosen for the event"));
            return;
        }

        if(eventInfo.description.trim().length === 0) {
            notify(new NotificationObject(NotificationType.WARNING, "No description given!"));
            return;
        }
        createEvent(Object.values(eventInfo));
        notify(new NotificationObject(NotificationType.SUCCESS, "Successfully created event!"))
        // clear the state
        setEventInfo({
            title: "",
            description: "",
            category: categories.length === 0 ? 0 :categories[0].id,
            isAllDay: true,
            momentStart: daySelected.clone(),
            momentEnd: daySelected.clone()
        })
    };

    return (
        <div className="newEventContainer">
            <div className="headerContainer">
                <h2 className="header">New Event</h2>
                <button onClick={() => setExpanded(!expanded)}>
                    <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} fixedWidth size="lg"/>
                </button>
            </div>
            {expanded &&
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
                    <button type="submit" onClick={handleCreate}>Create</button>
                </form>
            }
        </div>
    )
}

function mapStateToProps(store){
    return {
        categories: store.calendar.categories,
        daySelected: store.calendar.daySelected,
    }
}

function mapDispatchToProps(dispatch){
    return {
        /**
         * @param eventDetails {Array.<{title: string, description: string, category: number, start: Moment, end: Moment}>} Will be modified by this function.
         */
        createEvent: (eventDetails) => {
            const createdEvent = data.createEvent(eventDetails);
            dispatch(actions.createEvent(createdEvent));
        },
        /**
         * @param notification {NotificationObject}
         */
        notify: (notification) => {dispatch(notify(notification));},
    }
}

const NewEventViewerBox = connect(mapStateToProps, mapDispatchToProps)(NewEventViewerBoxConnect);

export default NewEventViewerBox;