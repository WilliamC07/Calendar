import React, {Component} from "react";
import {isCurrentDate} from "./util.js";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./dateComponent.css";

export default class DateComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            styleClasses: [],
            showAddEventButton: false
        };

        // standard styling
        if(isCurrentDate(this.props.date)){
            this.state.styleClasses.push("text-warning");
        }
    }

    render() {
        return(
            <div onMouseEnter={() => this.setState({showAddEventButton: true})}
                 onMouseLeave={() => this.setState({showAddEventButton: false})}>
                {this.headingLabel()}
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

        return(
            <div className="header-wrapper">
                <h5 className={this.state.styleClasses.join(" ")}>{label}</h5>
                {this.state.showAddEventButton && addEventButton}
            </div>
        );
    };
}

DateComponent.propTypes = {
    index: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    selectFirstDate: PropTypes.func,
};