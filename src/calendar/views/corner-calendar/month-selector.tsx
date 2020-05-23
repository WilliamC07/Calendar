import React from 'react';
import moment, {Moment} from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
  setMonthYearSelected: (newMoment: Moment) => void,
  monthYearSelected: Moment
}

const MonthSelector: React.FC<Props> = ({setMonthYearSelected, monthYearSelected}) => {
  function willClickToNow(offset: number): string {
    const now = moment();
    const nextMonthYear = monthYearSelected.clone().add(offset, "month");
    if(now.month() === nextMonthYear.month() && now.year() === nextMonthYear.year()){
      return "highlight";
    }else{
      return "default"
    }
  }
  function changeMonthYearSelected(offset: number) {
    setMonthYearSelected(monthYearSelected.clone().add(offset, "month"))
  }

  return (
    <div className="month-selector-container">
      <FontAwesomeIcon icon={faChevronLeft} size="lg" fixedWidth
                       className={willClickToNow(-1)}
                       onClick={() => changeMonthYearSelected(-1)}/>
      <h3 className={willClickToNow(0)}>{monthYearSelected.format("MMMM, YYYY")}</h3>
      <FontAwesomeIcon icon={faChevronRight} size="lg" fixedWidth
                       className={willClickToNow(1)}
                       onClick={() => changeMonthYearSelected(1)}/>
    </div>
  )
};

export default MonthSelector;