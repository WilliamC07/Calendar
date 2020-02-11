import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons/faChevronUp";
import "./design.scss";
import * as actions from "../actions";
import * as data from "../../data/calendar/data";
import {connect} from "react-redux";
import MomentPicker from "../momentPicker";

function NewEventViewerBoxConnect({categories, daySelected, createEvent}) {
    const [expanded, setExpanded] = useState(true); // true for testing
    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        category: "", // an integer as string since html treats everything as a string :/
        momentStart: daySelected.clone(),
        momentEnd: daySelected.clone()
    });

    const handleEventInfo = (e) => {
        setEventInfo({...eventInfo, [e.target.name]: e.target.value})
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
        createEvent(Object.values(eventInfo));
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
                        <label>Start Date</label>
                        <MomentPicker startingMoment={eventInfo.momentStart} setSelectedMoment={setStartingMoment} isAbove={true}/>
                    </div>
                    <div className="formGroup">
                        <label>End Date</label>
                        <MomentPicker startingMoment={eventInfo.momentEnd} setSelectedMoment={setEndingMoment} isAbove={false}/>
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
         * @param eventDetails {Array.<{title: string, description: string, category: id, start: Moment, end: Moment}>} Will be modified by this function.
         */
        createEvent: (eventDetails) => {
            const createdEvent = data.createEvent(eventDetails);
            console.log("created ", createdEvent);
            dispatch(actions.createEvent(createdEvent));
        }
    }
}

const NewEventViewerBox = connect(mapStateToProps, mapDispatchToProps)(NewEventViewerBoxConnect);

export default NewEventViewerBox;