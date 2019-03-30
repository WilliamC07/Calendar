import React, {Component} from "react";
import {getFirstSunday} from "./util";
import YearMonthChooserComponent from "./yearMonthChooserComponent";

export default class CalendarComponent extends Component{
    constructor(props){
        super(props);
        this.state = {};

        // Keep track of the second Sunday on the Calendar
        let displayingDate = getFirstSunday(new Date());
        displayingDate.setDate(displayingDate.getDate() + 7);
        this.state.displayingDate = displayingDate;
    }

    render() {
        return(
            <div className="wrapper">
                <YearMonthChooserComponent updateDisplayingDateMonth={this.updateDisplayingDateMonth} displayingDate={this.state.displayingDate}/>
            </div>
        )
    }

    /**
     * Update the displaying date to be the one in the parameter
     * @param date Date object with DayOfWeek equal to Sunday
     */
    updateDisplayingDate = (date) => {
        this.setState({displayingDate: date});
    };

    /**
     * Updates the calendar to show the given month.
     * @param monthNumber Index 0, so March is 2
     */
    updateDisplayingDateMonth = (monthNumber) => {
        // do mutate the state directly -- clone it
        let newDate = new Date(this.state.displayingDate);
        newDate.setDate(1);
        newDate.setMonth(monthNumber);
        newDate = getFirstSunday(newDate);
        newDate.setDate(newDate.getDate() + 7);
        this.setState({displayingDate: newDate});
    }
}