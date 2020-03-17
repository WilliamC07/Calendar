import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    setMonthYearSelected,
    setDaySelected,
} from '../../store/calendar/actions';
import moment from 'moment';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";

function CalendarBoxConnect({daySelected, monthYearSelected, setMonthYearSelected, setDaySelected}) {
    const [isChoosingDate, setIsChoosingDate] = useState(false);

    function createCells(){
        const firstSunday = monthYearSelected.clone().set('date', 1).day(0);
        const parts = [];
        for(let i = 0; i < 42; i++){
            const moment = firstSunday.clone().day(i);
            parts.push(
                <GridCell cellMoment={moment} setDaySelected={setDaySelected} key={moment.toISOString()}
                          daySelected={daySelected} monthYearSelected={monthYearSelected}/>
            );
        }
        return parts;
    }

    return (
        <div className="calendarBoxConnect">
            <MonthYearChooser selectedMonthYear={monthYearSelected} setMonthYearSelected={setMonthYearSelected} setIsChoosingDate={setIsChoosingDate}/>
            <div className="grid">
                {createCells()}
            </div>
        </div>
    );
}

CalendarBoxConnect.prototype = {
    daySelected: PropTypes.objectOf(moment),
    monthYearSelected: PropTypes.objectOf(moment),
    setMonthYearSelected: PropTypes.func,
    setDaySelected: PropTypes.func,
};

function mapStateToProps(store) {
    return {
        daySelected: store.calendar.daySelected,
        monthYearSelected: store.calendar.monthYearSelected,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMonthYearSelected: (moment) => dispatch(setMonthYearSelected(moment)),
        setDaySelected: (moment) => dispatch(setDaySelected(moment)),
    }
}

const CalendarBox = connect(mapStateToProps, mapDispatchToProps)(CalendarBoxConnect);
export default CalendarBox;

// TODO: Temporary removed. need to finish
function MonthYearChooser({selectedMonthYear, setMonthYearSelected, setIsChoosingDate}) {
    function changeMonthYearSelected(monthAmount){
        setMonthYearSelected(selectedMonthYear.clone().add(monthAmount, 'month'));
    }

    function getClassStyle(compareMoment){
        return moment().isSame(compareMoment, 'day') ? "currentText" : "regularText";
    }

    return (
        <div className="monthYearChooserContainer">
            <FontAwesomeIcon className={getClassStyle(selectedMonthYear.clone().subtract(1, 'month'))}
                             icon={faChevronLeft} size="lg" fixedWidth
                             onClick={() => changeMonthYearSelected(-1)}/>
            <h3 className={getClassStyle(selectedMonthYear) + " monthChooserHeading"} onClick={() => setIsChoosingDate(true)}>{selectedMonthYear.format("MMMM, YYYY")}</h3>
            <FontAwesomeIcon className={getClassStyle(selectedMonthYear.clone().add(1, 'month'))}
                             icon={faChevronRight} size="lg" fixedWidth onClick={() => changeMonthYearSelected(1)}/>
        </div>
    )
}

// TODO: Temporary removed. need to finish
function MonthYearGreaterSelector({monthYearSelected, setMonthYearSelected}){
    const [selectedMonth, setSelectedMonth] = useState(monthYearSelected.get('month'));
    const [selectedYear, setSelectedYear] = useState(monthYearSelected.get('year'));
    const [selectedDay, setSelectedDay] = useState(1);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function getMonthChooseClass(monthNumber) {
        const chosenMoment = moment().set('year', selectedYear).set('month', monthNumber);
        if(chosenMoment.get('month') === selectedMonth){
            return "selectedText";
        }else if(chosenMoment.isSame(moment(), "month")){
            return "currentText";
        }else{
            return "regularText";
        }
    }

    return (
        <div className="monthYearGreaterSelector">
            <div className="monthChoosingContainer">
                {MONTHS.map((month, index) => <h2 key={month + "choose"} className={getMonthChooseClass(index)}
                                                  onClick={() => setSelectedMonth(index)}>{month.substr(0, 3)}</h2>)}
            </div>
            <div className="yearChoosingContainer">
                <button onClick={() => setSelectedYear(selectedYear-3)}>{"<<"}</button>
                <button onClick={() => setSelectedYear(selectedYear-1)}>{"<"}</button>
                <input type="number" value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}/>
                <button onClick={() => setSelectedYear(selectedYear+1)}>{">"}</button>
                <button onClick={() => setSelectedYear(selectedYear+3)}>{">>"}</button>
            </div>
            <div className="bottomContainerChooser">
                <input type="number" max={parseInt(moment().set('year', selectedYear).set('month', selectedMonth).daysInMonth())}
                       min={1} value={selectedDay} onChange={e => setSelectedDay(e.target.value)}/>
                <button onClick={() => setMonthYearSelected(moment().set('year', selectedYear).set('month', selectedMonth).set('date', selectedDay))}>Select</button>
                <button onClick={() => setMonthYearSelected(moment())}>Today</button>
            </div>
        </div>
    )
}

function GridCell({cellMoment, setDaySelected, daySelected, monthYearSelected}){
    function getClassStyle(){
        if(cellMoment.isSame(daySelected, 'day')){
            return "selectedText";
        }else if(cellMoment.isSame(moment(), 'day')){
            return "currentText";
        }else if(cellMoment.isSame(monthYearSelected, 'month')){
            return "regularText";
        }else{
            return "extraneousText"
        }
    }

    return (
        <div className="cell" onClick={() => setDaySelected(cellMoment)}>
            <div className={getClassStyle()}>
                {cellMoment.get('date')}
            </div>
            <div className="circle"/>
        </div>
    )
}