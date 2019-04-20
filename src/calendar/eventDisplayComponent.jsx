import React, {Component} from "react";
import PropTypes from 'prop-types';
import './eventDisplayComponent.css';
import {equalDates} from './util';
import Event from './event';

export default class EventDisplayComponent extends Component{
    render() {
        return(
            <div>
                <h5 className="event-display-title-text event-display-size">{this.needsTitleText() ? this.props.event._title : ""}</h5>
            </div>
        )
    }

    /**
     * This component will have a label only if it is on the date that the event first starts or if the date is a sunday.
     * @returns {boolean} True if a title text is needed, false otherwise
     */
    needsTitleText = () => {
        return equalDates(this.props.date, this.props.event._dateStart) || this.props.date.getDay() === 0;
    }
}

EventDisplayComponent.propTypes = {
    event: PropTypes.instanceOf(Event),
    date: PropTypes.instanceOf(Date)
};