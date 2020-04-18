import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ApplicationState} from "../../../store";
import {Dispatch} from "redux";
import {Moment} from "moment";
import "./style.scss";
import MonthSelector from "./month-selector";
import * as actions from "../../../store/calendar/actions";

interface Props {
  momentSelected: Moment,
  monthYearSelected: Moment,

  setMonthYearSelected: (newMoment: Moment) => void,
}

const Component: React.FC<Props> = ({momentSelected, monthYearSelected, setMonthYearSelected}) => {
  return (
    <div>
      <MonthSelector setMonthYearSelected={setMonthYearSelected} monthYearSelected={monthYearSelected}/>
    </div>
  )
};

function mapStateToProps(store: ApplicationState) {
  return {
    momentSelected: store.calendar.momentSelected,
    monthYearSelected: store.calendar.monthYearSelected
  }
}

function mapDispatchToProps(dispatch: Dispatch){
  return {
    setMonthYearSelected: (newMoment: Moment) => {
      dispatch(actions.setMonthYearSelected(newMoment));
    }
  }
}

export const CornerCalendar = connect(mapStateToProps, mapDispatchToProps)(Component);