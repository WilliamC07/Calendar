import React, {Component} from 'react';
import {connect} from 'react-redux';
import {equalDates, getMonthString} from './util';
import PopComponent from './calendarPopComponent';
import actions from './actions';


class CalendarDay extends Component{
    render(){
        const wrapperStyle = {height: "100px", position: "relative"};

        return (
            <div style={wrapperStyle}
                 onDoubleClick={() => this.props.highlightIndex(this.props.index)}>
                {this.getLabelComponent()}
                {this.props.calendar.dateHighlight === this.props.index ? this.getPopComponent() : ""}
            </div>
        )
    };

    getLabelComponent = () => {
        const style = {margin: "0"};
        const date = this.props.date;
        let dateLabel = date.getDate();

        // Special markings
        if (equalDates(date, new Date())) {
            dateLabel += " - Today";
        } else if (date.getDate() === 1) {
            dateLabel += ` - ${getMonthString(date)}`;
        }

        return (
            <h3 style={style}>{dateLabel}</h3>
        );
    };

    getPopComponent = () => {
        return <PopComponent renderLeft={(this.props.index % 7) < 2}/>;
    }
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar,
    };
}

function matchDispatchToProps(dispatch){
    return {
        highlightIndex: (index) => dispatch(actions.highlightIndex(index))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CalendarDay);