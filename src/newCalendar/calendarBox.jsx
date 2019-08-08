import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    setMonthYearSelected,
    setDaySelected,
} from './actions';
import moment from 'moment';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";

function CalendarBoxConnect({daySelected, monthYearSelected, setMonthYearSelected, setDaySelected}) {
    return (
        <div className="calendarBoxConnect">
            <MonthYearChooser selectedMonthYear={monthYearSelected} setMonthYearSelected={setMonthYearSelected}/>
            <Grid daySelected={daySelected} monthYearSelected={monthYearSelected} setDaySelected={setDaySelected}/>
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

function MonthYearChooser({selectedMonthYear, setMonthYearSelected}) {
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
            <h3 className={getClassStyle(selectedMonthYear)}>{selectedMonthYear.format("MMMM, YYYY")}</h3>
            <FontAwesomeIcon className={getClassStyle(selectedMonthYear.clone().add(1, 'month'))}
                             icon={faChevronRight} size="lg" fixedWidth onClick={() => changeMonthYearSelected(1)}/>
        </div>
    )
}

function Grid({daySelected, monthYearSelected, setDaySelected}){
    const firstSunday = monthYearSelected.clone().set('date', 1).day(0);

    function createCells(){
        const parts = [];
        for(let i = 0; i < 42; i++){
            const moment = firstSunday.clone().day(i);
            parts.push(
                <GridCell cellMoment={moment} setDaySelected={setDaySelected} key={moment.toISOString()}
                          daySelected={daySelected}/>
            );
        }
        return parts;
    }

    return (
        <div className="grid">
            {createCells()}
        </div>
    )
}

function GridCell({cellMoment, setDaySelected, daySelected}){
    function getClassStyle(){
        if(cellMoment.isSame(daySelected, 'day')){
            return "selectedText";
        }else if(cellMoment.isSame(moment(), 'day')){
            return "currentText";
        }else{
            return "regularText";
        }
    }

    return (
        <div className="cell" onClick={() => setDaySelected(cellMoment)}>
            <div className={getClassStyle()}>
                {cellMoment.get('date')}
            </div>
        </div>
    )
}