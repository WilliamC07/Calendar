import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import CloseButton from '../components/closeButton.jsx';
import Event, {isValidTitle} from "./event";
import {addEvent, getEvents} from './calendarEvent';

import "./eventViewerComponent.css";

export default class EventViewerComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    render() {
        return(
            <div id="right-wrapper" onKeyDown={this.test} >
                {this.topLevelParts()}
                <div id="user-input-container">
                    {this.userInputTitle()}
                    {this.userInputDates()}
                </div>
                {this.userCreateEvent()}
            </div>
        );
    }

    topLevelParts = () => {
        const headerDateOptions = {weekday: "long", month: "short", year: "numeric", day: "numeric"};
        return (
            <div id="top-level">
                <CloseButton action={this.props.close}/>
                <h5 className="top-header-label text-success">
                    {this.props.firstSelectedDate.toLocaleString('en-us', headerDateOptions)}
                </h5>
            </div>
        );
    };
    userInputTitle = () => {
        const updateTitle = (event) => this.setState({title: event.target.value});
        return [
            <h5 className="input-label" key={"title"}>Title:</h5>,
            <input type="text" onChange={updateTitle} value={this.state.title} id="title-input" key={"title-input"}/>,
        ];
    };
    /**
     * The first date is selected by clicking on the plus sign next when the user hovers over the date. The second date
     * is done by regular clicking on the calendar.
     * @returns {*}
     */
    userInputDates = () => {
        let date = new Date();
        const formatDate = (date) => `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        const firstSelectedDate = this.props.firstSelectedDate;
        const secondSelectedDate = this.props.secondSelectedDate;

        return[
            <h5 className="input-label" key={"date"}>Date</h5>,
            <h5 className="input-label" key={"date-start"}> start:</h5>,
            <h5 className="input-label" key={"date-start-input"}>{formatDate(this.props.firstSelectedDate)}</h5>,
            <h5 className="input-label" id="date-end-label" key={"date-end"}>end:</h5>,
            <h5 className="input-label" id="second-selected-date-label" key={"date-end-input"}>{formatDate(secondSelectedDate === undefined ? firstSelectedDate : secondSelectedDate)}</h5>,
        ]
    };
    userCreateEvent = () => {
        const createEvent = () => {
            addEvent(new Event(this.state.title, this.props.firstSelectedDate, this.props.secondSelectedDate));
            // rerender everything
            this.props.renderCalendar();
        };

        return(
            <div className="create-event-container">
                <Button className="btn btn-primary"
                        onClick={createEvent}>Create Event</Button>
            </div>
        )
    }
}

EventViewerComponent.propTypes = {
    close: PropTypes.func,
    firstSelectedDate: PropTypes.instanceOf(Date),
    secondSelectedDate: PropTypes.instanceOf(Date),
    renderCalendar: PropTypes.func
};