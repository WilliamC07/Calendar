import React, {Component} from "react";
import {getFirstSunday, getSunday} from "./util";
import YearMonthChooserComponent from "./yearMonthChooserComponent";
import DateComponent from "./dateComponent";
import EventViewerComponent from "./eventViewerComponent.jsx";
import "./calendar.css";

export default class CalendarComponent extends Component{
    constructor(props){
        super(props);
        this.state = {};

        // Keep track of the second Sunday on the Calendar
        let displayingDate = getFirstSunday(new Date());
        displayingDate.setDate(displayingDate.getDate() + 7);
        this.state.displayingDate = displayingDate;

        // User selecting days
        this.state.firstSelectedDate = undefined;
        this.state.secondSelectedDate = undefined;
    }

    render() {
        return(
            <div id="whole-wrapper">
                <div id="left-wrapper">
                    {this.renderYearMonthChooserComponent()}
                    <div id="calendar-grid">
                        {this.renderDateComponents()}
                    </div>
                </div>
                {this.state.firstSelectedDate !== undefined ?
                    <EventViewerComponent
                        close={this.closeSelectedDay}
                        firstSelectedDate={this.state.firstSelectedDate}
                        secondSelectedDate={this.state.secondSelectedDate}/> :
                    ""}
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

    renderDateComponents = () => {
        const parts = new Array(7 * 6);
        const firstSunday = new Date(this.state.displayingDate);
        firstSunday.setDate(firstSunday.getDate() - 7);

        for(let i = 0; i < 7 * 6; i++){
            const componentDate = new Date(firstSunday);
            componentDate.setDate(componentDate.getDate() + i);

            parts.push(
                <DateComponent key={i + "calendar"}
                               index={i}
                               date={componentDate}
                               firstSelectedDate={this.state.firstSelectedDate}
                               secondSelectedDate={this.state.firstSelectedDate}
                               selectFirstDate={this.selectFirstDate}/>
            );
        }

        return parts;
    };

    /* Mutators for displayingDate state */
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
    };

    /* Mutators for selected dates */
    /**
     * Selects the first date. Also shows the component to manipulate events indirectly.
     * @param date Date to be selected. Undefined for nothing to be shown
     */
    selectFirstDate = (date) => {
        this.setState({firstSelectedDate: date});
    };
    /**
     * Closes the selected day.
     */
    closeSelectedDay = () => {
        this.setState({firstSelectedDate: undefined});
    }
}