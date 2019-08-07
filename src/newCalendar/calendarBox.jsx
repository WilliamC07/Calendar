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
        <div>
            <MonthYearChooser selectedMonthYear={monthYearSelected} setMonthYearSelected={setMonthYearSelected}/>
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

    const today = moment();
    let textClass;
    if(today.format("MMMMYYYY") === selectedMonthYear.format("MMMMYYYY")){
        textClass = "currentText";
    }else{
        textClass = "regularText";
    }

    return (
        <div className="monthYearChooserContainer">
            <FontAwesomeIcon icon={faChevronLeft} size="lg" onClick={() => changeMonthYearSelected(-1)}/>
            <h3 className={textClass}>{selectedMonthYear.format("MMMM, YYYY")}</h3>
            <FontAwesomeIcon icon={faChevronRight} size="lg" onClick={() => changeMonthYearSelected(1)}/>
        </div>
    )
}