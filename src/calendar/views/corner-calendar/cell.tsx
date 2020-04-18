import React from 'react';
import moment, {Moment} from 'moment';

interface Props {
  currentMoment: Moment,
  numberOfEvents: number,
}

const Cell: React.FC<Props> = ({currentMoment, numberOfEvents}) => {
  const isToday = moment().isSame(currentMoment, 'date');

  return (
    <div className="corner-calendar-cell">
      <span data-is-today={isToday}>{currentMoment.date()}</span>
      {numberOfEvents === 0 ? "" : <span>{numberOfEvents}</span>}
    </div>
  )
};

export default Cell;