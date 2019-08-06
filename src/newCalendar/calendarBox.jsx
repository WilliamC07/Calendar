import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

function CalendarBoxConnect({daySelected, monthYearSelected}) {
    return (
        <div>
            <div>

            </div>
        </div>
    );
}

CalendarBoxConnect.prototype = {
    daySelected: PropTypes.objectOf(moment),
    monthYearSelected: PropTypes.objectOf(moment)
};

function mapStateToProps(store) {
    return {
        daySelected: store.calendar.daySelected,
        monthYearSelected: store.calendar.monthYearSelected,
    }
}

function mapDispatchToProps() {

}

const CalendarBox = connect(mapStateToProps, mapDispatchToProps)(CalendarBoxConnect);
export default CalendarBox;