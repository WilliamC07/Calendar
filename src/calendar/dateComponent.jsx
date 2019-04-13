import React, {Component} from "react";
import {isCurrentDate, equalDates} from "./util.js";
import Button from "react-bootstrap/Button";
import EventDisplayComponent from './eventDisplayComponent';
import {getEvents} from './calendarEvent';
import PropTypes from "prop-types";
import "./dateComponent.css";
import "./eventDisplayComponent.css";

export default class DateComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            showAddEventButton: false
        };
    }

    render() {
        return(
            <div onMouseEnter={() => this.setState({showAddEventButton: true})}
                 onMouseLeave={() => this.setState({showAddEventButton: false})}
                 onClick={() => {
                     this.props.selectSecondDate(this.props.date);
                     console.log(getEvents(this.props.date));
                 }}>
                {this.headingLabel()}
                {this.addEventComponents()}
            </div>
        )
    }

    /**
     * Creates a header for the heading text of this component. When the user highlights this field, they can choose
     * to add an event.
     * Format of:
     * - If it is the user current day: __ - Today
     * - If it is the first day of the month: month/date
     *
     * @returns h5 header
     */
    headingLabel = () => {
        let date = this.props.date;
        let label = date.getDate() + "";

        // first day of the display or first day of the month needs additional information
        if(this.props.index === 0 || date.getDate() === 1){
            label = (date.getMonth() + 1) + "/" + label;
        }

        if(isCurrentDate(date)){
            label += " - Today";
        }

        const addEventButton = (
            <Button variant="primary"
                    onClick={() => this.props.selectFirstDate(this.props.date)}
                    size="sm"
                    className="add-event-button">
                +
            </Button>
        );

        let headerTextStyleClasses = "";
        if(equalDates(this.props.firstSelectedDate, this.props.date)){
            headerTextStyleClasses = "text-success";
        }else if(isCurrentDate(this.props.date)){
            headerTextStyleClasses = "text-warning";
        }

        return(
            <div className="header-wrapper">
                <h5 className={headerTextStyleClasses}>{label}</h5>
                {this.state.showAddEventButton && addEventButton}
            </div>
        );
    };

    addEventComponents = () => {
        const events = getEvents(this.props.date);  // already sorted from longest to shortest event
        const order = [];  // list of event
        const date = this.props.date;

        for(let i = 0; i < events.length; i++){
            if(i >= 2 && events.length > 3){
                order.push(<h5 className="event-display-title-text">{`${events.length-i} more`}</h5>);
                break;
            }

            const event = events[i];
            // sunday or first day of the event means we set the own position
            if(date.getDay() === 0 || equalDates(date, event._dateStart)){
                event.position = i;  // the index the event will go
                order[i] = event;
            }else{
                // have the follow the old position
                order[event.position] = event;
                console.log(`ordered at ${date} to ${event.position}`);
                console.log(order);
            }
        }

        // populate the empty spots (undefined). Starting at index 3 because the last three elements have already been
        // added if they exit
        let orderIndex = 0;
        for(let i = 3; i < events.length; i++, orderIndex++){
            if(order[orderIndex] === undefined){
                order[i] = events[i];
            }
        }

        // map the event to components
        const convertedComponents = [];
        for(let i = 0; i < order.length; i++){
            const event = order[i];
            if(event === undefined){
                convertedComponents.push(<h5 className="event-display-title-text" key={"empty"+i}></h5>);
            }else{
                convertedComponents.push(<EventDisplayComponent event={event} key={event._title+i}/>);
            }
        }
        return convertedComponents;
    }
}

DateComponent.propTypes = {
    index: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    firstSelectedDate: PropTypes.instanceOf(Date),
    secondSelectedDate: PropTypes.instanceOf(Date),
    selectFirstDate: PropTypes.func,
    selectSecondDate: PropTypes.func,
};