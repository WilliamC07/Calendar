import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons/faChevronUp";
import "./design.scss";
import {connect} from "react-redux";

function NewEventViewerBoxConnect({}) {
    const [expanded, setExpanded] = useState(false);
    const [eventInfo, setEventInfo] = useState({
        name: "",
    });

    const handleEventInfo = (e) => {
        setEventInfo({...eventInfo, [e.target.id]: e.target.value})
    };

    return (
        <div className="newEventContainer">
            <div className="headerContainer">
                <h2>New Event</h2>
                <button onClick={() => setExpanded(!expanded)}>
                    <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} fixedWidth size="lg"/>
                </button>
            </div>
            {expanded &&
                <div className="makerContainer">

                </div>
            }
        </div>
    )
}

function mapStateToProps(store){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}

const NewEventViewerBox = connect(mapStateToProps, mapDispatchToProps)(NewEventViewerBoxConnect);

export default NewEventViewerBox;