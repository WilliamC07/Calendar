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
                 onClick={() => this.props.selectSecondDate(this.props.date)}>
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

    /**
     * Renders the event view (the boxes with the event name and color) on the screen.
     * @returns {Array}
     */
    addEventComponents = () => {
        const date = this.props.date;
        const allEvents = getEvents(this.props.date);  // already sorted from longest to shortest event
        const longEvents = allEvents.filter(event => event._length > 1);
        const shortEvents = allEvents.filter(event => event._length === 1);
        const order = [];  // list of event to be added in that specific order.

        // clear positioning for sundays or if it is the start of the event
        if(date.getDay() === 0){
            allEvents.forEach(event => event.position = -1);
        }
        allEvents.filter(event => equalDates(event._dateStart, date)).forEach(event => event.position = -1);

        // add long events with positions first
        longEvents.filter(event => event.position !== -1)
            .forEach((event) =>
                order[event.position] = event
            );

        // add the other long events
        let orderIndex = 0;
        longEvents.filter(event => event.position === -1)
            .forEach(event => {
                // find an empty position
                while(order[orderIndex] !== undefined){
                    orderIndex++;
                }
                order[orderIndex] = event;
                // do not save position for sunday
                if(date.getDay() !== 6){
                    event.position = orderIndex;
                }
                // clear positioning for when user deletes event and needs to create the view
                if(equalDates(event._dateEnd, date)){
                    event.position = -1;
                }
            });

        // add the short events
        orderIndex = 0;
        shortEvents.forEach(event => {
            while(order[orderIndex] !== undefined){
                orderIndex++;
            }
            order[orderIndex] = event;
            event.position = orderIndex;
        });

        // map the event to components
        const convertedComponents = [];
        orderIndex = 0;
        for(; orderIndex < order.length; orderIndex++){
            if(orderIndex >= 2 && order.length > 3){
                convertedComponents.push(<h5 className="event-display-title-text event-display-size">{`${order.length-orderIndex} more`}</h5>);
                break;
            }else if(order[orderIndex] === undefined){
                convertedComponents.push(<div className="event-display-filler event-display-size" key={"filler"+orderIndex}/>);
            }else{
                let event = order[orderIndex];
                convertedComponents.push(<EventDisplayComponent event={event} key={event._title+orderIndex} date={this.props.date}/>);
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