import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons/faChevronUp";
import "./design.scss";
import {connect} from "react-redux";
import MomentPicker from "../momentPicker";

function NewEventViewerBoxConnect({categories, daySelected}) {
    const [expanded, setExpanded] = useState(true); // true for testing
    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        category: "", // an integer as string since html treats everything as a string :/
        momentStart: daySelected.clone(),
        momentEnd: daySelected.clone()
    });

    // Since the prop categories has to be read from database, there is technically two updates: one of default empty
    // list and another when this program finish reading the db and populates the empty list
    // we need to set a category chosen to default of the first category since there has to be a category for each event
    useEffect(() => {
        if(categories.length > 0){
            setEventInfo({
                ...eventInfo,
                category: String(categories[0].id)
            })
        }
    }, [categories]);

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

    const createEvent = (e) => {
        e.preventDefault();
        console.log(eventInfo);
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
                    <button type="submit" onClick={createEvent}>Create</button>
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

    }
}

const NewEventViewerBox = connect(mapStateToProps, mapDispatchToProps)(NewEventViewerBoxConnect);

export default NewEventViewerBox;