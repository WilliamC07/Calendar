import React from 'react'

function DateView({startingDate}){

    function daysOfWeekLabel(){
        const parts = new Array(7);
        for(const name of ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]){
            parts.push(<h3 key={name}>{name}</h3>);
        }
        return parts;
    }

    return (
        <div id="dateViewContainer">
            <div/>
            {daysOfWeekLabel()}
            <h3>Earned</h3>
            <h3>Spent</h3>
        </div>
    )
}

export default DateView;