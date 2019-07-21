import React from 'react';

/**
 * Generates top level of Money Component. Allows the user to choose which week to look at by either incrementing or
 * decrementing the week or choosing the current week.
 */
function DatePicker({startingDate, setStartingDate}){
    return (
        <div id="datePicketContainer">
            <input type="button" value="<" onClick={() => setStartingDate(startingDate.clone().day(-7))}/>
            <h3>{startingDate.format("M/D/YY") + "-" + startingDate.clone().day(6).format("M/D/YY")}</h3>
            <input type="button" value=">" onClick={() => setStartingDate(startingDate.clone().day(7))}/>
        </div>
    )
}

export default DatePicker;