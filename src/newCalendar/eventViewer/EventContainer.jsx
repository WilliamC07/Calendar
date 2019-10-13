import React, {useState, useRef} from 'react';
import {connect} from "react-redux";

/**
 * Show the events for the previous 2 days, current, and next 4 days
 */
function EventContainerConnect({daySelected}){


    return (
        <div>

        </div>
    )
}

function EventBox({events}){
    return (
        <div>

        </div>
    )
}

function mapStateToProps(store){
    return {
        daySelected: store.calendar.daySelected
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}

const EventContainer = connect(mapStateToProps, mapDispatchToProps)(EventContainerConnect);

export default EventContainer;