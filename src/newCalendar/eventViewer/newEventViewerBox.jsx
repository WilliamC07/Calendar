import React, {useState} from 'react';
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
    });

    const handleEventInfo = (e) => {
        setEventInfo({...eventInfo, [e.target.name]: e.target.value})
    };

    const setStartingMoment = (moment) => {

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
                        <MomentPicker startingMoment={daySelected} setSelectedMoment={setStartingMoment}/>
                    </div>
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