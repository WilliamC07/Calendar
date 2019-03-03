import React, {Component} from 'react';
import PopEvent from './popEvent.jsx';

const util = require("./util.js");

class CalendarDay extends Component {
    render() {
        const headerStyle = {height: "100px", position: "relative"};

        return (
            <div
                onDoubleClick={() => this.props.showPop(this.props.index)}
                style={headerStyle}>
                {this.props.needsPop ? <PopEvent renderOnLeft={this.props.renderPopToLeft} onClose={this.closePopEvent}
                details={this.props.eventsForDay} date={this.props.date}/> : ""}
                {this.getDateLabel()}
            </div>
        );
    };

    getDateLabel = () => {
        const style = {margin: "0"};
        const date = this.props.date;
        let dateLabel = date.getDate();

        // Special markings
        if (util.equalDates(date, new Date())) {
            dateLabel += " - Today";
        } else if (date.getDate() === 1) {
            dateLabel += ` - ${util.getMonthString(date)}`;
        }

        return (
            <h3 style={style}>{dateLabel}</h3>
        );
    };

    closePopEvent = (event) => {
        // Prevent the click from bubbling up to the parent and reopening the PopEvent
        event.stopPropagation();
        // Index of -1 means no pop events are present
        this.props.showPop(-1);
    };
}

export default CalendarDay;