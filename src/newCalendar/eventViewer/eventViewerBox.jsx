import React from 'react';
import {connect} from 'react-redux';
import {setDaySelected} from "./actions";

function EventViewerBoxConnect({daySelected, setDaySelected}){
    return (
        <div className="eventViewerBox">
            <h3>{daySelected.format("MMMM D, YYYY")}</h3>
        </div>
    );
}

function mapStateToProps({calendar}){

    return {
        daySelected: calendar.daySelected,

    };
}

function mapDispatchToProps(dispatch){
    return {
        setDaySelected: (moment) => dispatch(setDaySelected(moment)),
    }
}

const EventViewerBox = connect(mapStateToProps, mapDispatchToProps)(EventViewerBoxConnect);
export default EventViewerBox;

