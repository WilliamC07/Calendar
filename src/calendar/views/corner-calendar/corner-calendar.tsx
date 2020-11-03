import React, {useState} from 'react';
import {connect} from 'react-redux';
import {RootState} from "../../../store";
import {Dispatch} from "redux";
import {Moment} from "moment";
import "./style.scss";
import MonthSelector from "./month-selector";
import * as actions from "../../../store/calendar/actions";
import Cell from "./cell";
import Event from "../../event";

interface Props {
  momentSelected: Moment,
  monthYearSelected: Moment,
  events: Event[],

  setMonthYearSelected: (newMoment: Moment) => void,
  setMomentSelected: (selected: Moment) => void,
}

const Component: React.FC<Props> = ({momentSelected, monthYearSelected, setMonthYearSelected, events, setMomentSelected}) => {
  function generateCells(): JSX.Element[] {
    const cells: JSX.Element[] = [];
    const firstSundayOfMonth = monthYearSelected.clone().set('date', 1).day(0);

    // generate 6 weeks
    for(let i = 0; i < 6 * 7; i++){
      const current = firstSundayOfMonth.clone().day(i);
      const key = current.toISOString() + "corner";
      const numberOfEvents = Event.eventsForMoment(events, current).length;
      cells.push(
        <Cell currentMoment={current} key={key} numberOfEvents={numberOfEvents} handleSelect={setMomentSelected}
              momentSelected={momentSelected}/>
      );
    }

    return cells;
  }

  return (
    <div className="corner-calendar-container">
      <MonthSelector setMonthYearSelected={setMonthYearSelected} monthYearSelected={monthYearSelected}/>
      <div className="corner-calendar-cell-container">
        {generateCells()}
      </div>
    </div>
  )
};

function mapStateToProps(store: RootState) {
  return {
    momentSelected: store.calendar.momentSelected,
    monthYearSelected: store.calendar.monthYearSelected,
    events: store.calendar.events,
  }
}

function mapDispatchToProps(dispatch: Dispatch){
  return {
    setMonthYearSelected: (newMoment: Moment) => dispatch(actions.setMonthYearSelected(newMoment)),
    setMomentSelected: (selected: Moment) => dispatch(actions.setDaySelected(selected))
  }
}

export const CornerCalendar = connect(mapStateToProps, mapDispatchToProps)(Component);