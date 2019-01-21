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
            anyDateSelected: false,
            dateSelected: {date: undefined, row: 0, column: 0},
        }
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
                    {this.createDays()}
                    {this.state.anyDateSelected ? this.createExpandDay(this.state.dateSelected) : ""}
                </div>
            </div>
        );
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
     * Creates the calendar days
     * @returns {Array}
     */
    createDays = () => {
        const parts = [];
        for (let i = 0; i < 42; i++) {
            // where the day is on the calendar
            let position = {column: i % 7, row: parseInt(i / 7)};
            let firstSunday = util.getFirstSunday(this.state.date);
            // Add the amount of days difference from the first sunday of the month
            firstSunday.setDate(firstSunday.getDate() + i);
            parts.push(<CalendarDay date={firstSunday} selectDay={this.selectDay} position={position} key={i}/>)
        }
        return parts;
    };

    selectDay = (date, {row, column}) => {
        this.setState({
            dateSelected: {date, row, column},
            anyDateSelected: true,
        });
    };

    createExpandDay = ({date, column, row}) => {
        const rowPos = row > 3 ? row - 3 : 0;
        const columnPos = column < 2 ? 1 + column : column - 2;

        const style = {
            position: "absolute",
            zIndex: "1",
            top: `${rowPos / 6 * 100}%`,
            left: `${columnPos /7 * 100}%`,
            height: `${2/3 * 100}%`,
            width: `${2/7 * 100}%`,
            background: "#3F3F3FE6",
        };

        return (
            <div style={style}>
                <h1>close</h1>
            </div>
        );
    };

}

export default Calendar;