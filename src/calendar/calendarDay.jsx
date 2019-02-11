import React, {Component} from 'react';
import PopEvent from './popEvent.jsx';

const util = require("./util.js");

/**
 * Stateless
 */
class CalendarDay extends Component {
    render() {
        return (
            <div
                onDoubleClick={() => this.props.showPop(this.props.information.index)}
                style={{height: "100px", position: "relative"}}>
                {this.props.information.isSelected ? this.createPopEvent() : ""}
                <div style={{position: "absolute"}}>
                    <h3 style={{margin: "0"}}>
                        {this.getContext(this.props.information.date)}
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

    /**
     * TODO: clear all other pop events
     */
    createPopEvent = () => {
        const information = {};
        const position = this.props.information.position;

        information.position = position;
        // Column index 2 because the space of a PopEvent is around 2 CalendarDays
        information.isLeftSide = position.column >= 2;
        information.date = this.props.information.date;

        return <PopEvent information={information} onPopEventClose={this.closePopEvent}/>;
    };

    closePopEvent = (e) => {
        // Prevent the click from bubbling up to the parent and reopening the PopEvent
        e.stopPropagation();
        // Index of -1 means no pop events are present
        this.props.showPop(-1);
    }
}

export default CalendarDay;