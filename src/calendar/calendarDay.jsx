import React, {Component} from 'react';

const util = require("./util.js");

/**
 * Stateless
 */
class CalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    };

    render() {
        return (
            <div onClick={() => this.props.selectDay(this.props.date, this.props.position)} style={{height: "100px"}}>
                <div style={{position: "absolute"}}>
                    <h3 style={{margin: "0", position: "relative"}}>
                        {this.getContext(this.props.date)}
                    </h3>
                </div>
            </div>
        );
    };

    /**
     * Get the first line of this class
     * @param date Date that this instance represents
     * @returns {string} Line to show the user
     */
    getContext = (date) => {
        let text = date.getDate();

        // If the day is today
        if (util.equalDates(date, new Date())) {
            text += " - Today";
        }

        if (date.getDate() === 1) {
            text += ` - ${util.getMonthString(date)}`;
        }

        return text;
    };

}

export default CalendarDay;