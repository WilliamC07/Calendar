import React, {Component} from "react";
import {getFirstSunday, getSunday} from "./util";
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
                {this.renderYearMonthChooserComponent()}
            </div>
        )
    }

    renderYearMonthChooserComponent(){
        return(
            <YearMonthChooserComponent
                updateDisplayingDateMonth={this.updateDisplayingDateMonth}
                updateDisplayingDateYear={this.updateDisplayingDateYear}
                updateDisplayingDateToToday={this.updateDisplayingDateToToday}
                displayingDate={this.state.displayingDate}/>
        )
    }

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
    };

    /**
     * Updates the calendar to show the given year with the same year
     * @param year Year to show
     */
    updateDisplayingDateYear = (year) => {
        // do mutate the state directly -- clone it
        let newDate = new Date(year, this.state.displayingDate.getMonth(), this.state.displayingDate.getDate());
        newDate = getSunday(newDate);
        // bring back to date in case of going back to forward a week
        if(newDate.getMonth() !== this.state.displayingDate.getMonth()){
            newDate.setDate(newDate.getDate() + 7 * (this.state.displayingDate.getMonth() - newDate.getMonth()));
        }
        this.setState({displayingDate: newDate});
    };

    /**
     * Updates the calendar to show the current date again (the day the user is living in)
     */
    updateDisplayingDateToToday = () => {
        let newDate = getFirstSunday(new Date());
        newDate.setDate(newDate.getDate() + 7);
        this.setState({displayingDate: newDate});
    }
}