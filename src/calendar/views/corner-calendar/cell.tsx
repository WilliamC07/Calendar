import React from 'react';
import moment, {Moment} from 'moment';

interface Props {
  currentMoment: Moment,
  numberOfEvents: number,
  handleSelect: (selected: Moment) => void,
  momentSelected: Moment,
}

const Cell: React.FC<Props> = ({currentMoment, numberOfEvents, handleSelect, momentSelected}) => {
  let dateTextClasses = "";
  if(currentMoment.isSame(momentSelected, "date")) dateTextClasses += "success";
  else if(moment().isSame(currentMoment, 'date')) dateTextClasses += "highlight";
  else dateTextClasses += "default";

  return (
    <div className="corner-calendar-cell" onClick={() => handleSelect(currentMoment)}>
      <span className={dateTextClasses}>{currentMoment.date()}</span>
      {numberOfEvents === 0 ? "" : <span>{numberOfEvents}</span>}
    </div>
  )
};

export default Cell;