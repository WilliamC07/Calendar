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

    function getClassForMoment(compareMoment){
        const today = moment();
        return today.format("MMMMYYYY") === compareMoment.format("MMMMYYYY") ? "currentText" : "regularText";
    }

    return (
        <div className="monthYearChooserContainer">
            <FontAwesomeIcon className={getClassForMoment(selectedMonthYear.clone().subtract(1, 'month'))}
                             icon={faChevronLeft} size="lg" fixedWidth
                             onClick={() => changeMonthYearSelected(-1)}/>
            <h3 className={getClassForMoment(selectedMonthYear)}>{selectedMonthYear.format("MMMM, YYYY")}</h3>
            <FontAwesomeIcon className={getClassForMoment(selectedMonthYear.clone().add(1, 'month'))}
                             icon={faChevronRight} size="lg" fixedWidth onClick={() => changeMonthYearSelected(1)}/>
        </div>
    )
}