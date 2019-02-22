import React, {Component} from 'react';
import TopBar from '../components/topBar.jsx';
import CalendarDay from "./calendarDay";

const util = require('./util.js');

class MonthYearChooser extends Component {
    render() {
        return (
            <div>Header</div>
        );
    }
}

/**
 * Single source of truth
 */
export default class Calendar extends Component {
    constructor(props) {
        super(props);
        // The date representation of what the month is showing
        const date = new Date();
        // The date must be the first day of the month
        date.setDate(1);
        console.log(date);
        this.state = {
            // The date being shown on the screen. The day of the month should be 1.
            firstDayOfMonth: date,
            // The index (imagine the calendar is a 1D array) of the calendar day that has the pop shown
            indexOfDayWithPop: -1
        };
    }

    render() {
        const wrapperStyle = {
            display: "flex",
            flexDirection: "column",
            height: 'auto'
        };
        const calendarGridStyle = {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            flexGrow: "1",
            position: "relative"
        };

        return (
            <div style={wrapperStyle}>
                <TopBar information={'Calendar'}/>
                <MonthYearChooser/>
                <div style={calendarGridStyle}>
                    {this.createDaysOfWeekComponent()}
                    {this.createDaysOfMonthComponent()}
                </div>
            </div>
        )
    }

    /**
     * Creates an array of elements each containing the day of the week in the order from Sunday to Saturday.
     * @returns {Array} Array containing all the names of the days of the week
     */
    createDaysOfWeekComponent = () => {
        const parts = [];
        for (let i = 0; i < 7; i++) {
            parts[i] = (
                <h1 style={{textAlign: "center"}} key={i}>{util.daysOfWeek[i]}</h1>
            )
        }
        return parts;
    };

    /**
     * Creates an list of all the days of the month. The first day is the first Sunday (this may be the last Sunday
     * of the previous month. This creates the next six weeks from the first Sunday.
     * @returns {Array} A 1D array representation of the calendar month
     */
    createDaysOfMonthComponent = () => {
        // 1D representation of the calendar
        const daysOfCalendar = [];
        const firstSunday = util.getFirstSunday(this.state.firstDayOfMonth);
        // 7 * 6 represents the 7 days of the week and the 6 represents the amount of weeks to be shown
        for (let index = 0; index < 7 * 6; index++) {
            let needsPop = index === this.state.indexOfDayWithPop;
            // The pop can only render to the left if there is space
            // The 2 represents Tuesday. The pop takes up two column spaces so it cannot fit if the date is Sunday or Monday
            let renderPopToLeft = index % 7 < 2;
            // Get the date to be shown on the current index
            let datePart = new Date(firstSunday);
            datePart.setDate(datePart.getDate() + index);
            daysOfCalendar.push(
                <CalendarDay date={datePart} renderPopToLeft={renderPopToLeft} needsPop={needsPop} key={index}
                             index={index} showPop={this.showPop} eventsForDay={{}}/>
            );
        }
        return daysOfCalendar;
    };

    /**
     * Shows the pop for the given day. Any negative number means that no calendar day should have a pop shown. Only
     * one pop can be shown at once
     * @param indexOfCalendarDay Index of the calendar day to have a pop.
     */
    showPop = (indexOfCalendarDay) => {
        this.setState({indexOfDayWithPop: indexOfCalendarDay})
    };
}