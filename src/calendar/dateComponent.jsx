import React, {Component} from "react";
import {isCurrentDate, equalDates} from "./util.js";
import Button from "react-bootstrap/Button";
import EventDisplayComponent from './eventDisplayComponent';
import {getEvents} from './calendarEvent';
import PropTypes from "prop-types";
import "./dateComponent.css";

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

    addEventComponents = () => {
        const events = getEvents(this.props.date);
        return events.map((event, index) => {
            if(index === 2 && events.length > 3){
                return <h5>{`${events.length-index} more`}</h5>
            }else if(index <= 2 || events.length === 3){
                return <EventDisplayComponent event={event} key={event._title+index}/>
            }else{
                // do not make any more children
                return "";
            }
        })
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