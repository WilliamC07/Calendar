import React, {Component} from 'react';
import TopBar from '../components/topBar.jsx';
import CalendarDay from "./calendarDay";

const util = require('./util.js');

class Calendar extends Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        this.state = {
            date: currentDate,
        };
        this.state.calendarDays = this.createDaysArray();
    }

    render() {
        // NavBar
        const information = {name: "Calendar"};

        return (
            <div style={{display: "flex", flexDirection: "column", height: 'auto'}}>
                <TopBar information={information}/>
                {this.createMonthChoose()}
                <div style={{display: "grid", gridTemplateColumns: "repeat(7, 1fr)"}}>
                    {this.createDaysOfWeek()}
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gridTemplateRows: "repeat(6, 1fr)",
                    flexGrow: "1",
                    position: "relative"
                }}>
                    {this.state.calendarDays.map((value, index) => <CalendarDay information={value}
                                                                                showPop={this.showPop} key={index}/>)}
                </div>
            </div>
        );
    };

    showPop = (indexOfPop) => {
        console.log(indexOfPop, "popindex");
        this.setState({
            calendarDays: this.createDaysArray(indexOfPop)
        });
    };

    /**
     * Creates the top section of the calendar to view what month and to change the month.
     */
    createMonthChoose = () => {
        return (
            <div style={{display: "flex", alignItems: "center", alignSelf: "center"}}>
                <button onClick={() => this.changeMonth(-1)}>{"<"}</button>
                <h1 style={{display: "inline", margin: "0"}}>{util.getMonthString(this.state.date)}</h1>
                <button onClick={() => this.changeMonth(1)}>{">"}</button>
            </div>
        )
    };

    /**
     * Change the month being displayed on the screen
     * @param amount
     */
    changeMonth = (amount) => {
        let old = this.state.date;
        let copy = new Date(old.getFullYear(), old.getMonth() + amount, old.getDate());
        this.setState({
            date: copy
        });
    };

    /**
     * Gets the day of the week
     * @returns {Array} Elements to be added
     */
    createDaysOfWeek = () => {
        const parts = [];
        for (let i = 0; i < 7; i++) {
            parts[i] = (
                <h1 style={{textAlign: "center"}} key={i}>{util.daysOfWeek[i]}</h1>
            )
        }
        return parts;
    };

    /**
     * Representation of the calendar in a 1D array.
     * @param indexOfSelected Whether or not a PopEvent should be created for the given calendar index. If no value is given, then no day will have a PopEvent.
     * @returns {Array} Array to represent the 6 weeks in a month in a 1D array
     */
    createDaysArray = (indexOfSelected = -1) => {
        const calendarDays = [];

        for (let i = 0; i < 42; i++) {
            // where the day is on the calendar
            let position = {column: i % 7, row: parseInt(i / 7)};
            // Add the amount of days difference from the first sunday of the month
            let date = util.getFirstSunday(this.state.date);
            date.setDate(date.getDate() + i);

            calendarDays.push(Calendar.createDayObject(date, position, i, i === indexOfSelected));
        }

        return calendarDays;
    };

    static createDayObject(date, position, index, isSelected) {
        return {date: date, position: position, index: index, isSelected: isSelected}
    }

}

export default Calendar;