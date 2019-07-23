import React from 'react'

function DateView({startingDate}){

    function daysOfWeekLabel(){
        const parts = new Array(7);
        for(const name of ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]){
            parts.push(<h3 key={name}>{name}</h3>);
        }
        return parts;
    }

    function earnedFields(){
        const parts = [];
        for(let day = 0; day < 7; day++){
            parts.push(<h3 onClick={() => console.log("clicked!")}>$0</h3>)
        }
        return parts;
    }

    function spentFields(){
        const parts = [];
        for(let day = 0; day < 7; day++){
            parts.push(<h3 onClick={() => console.log("clicked!")}>$0</h3>)
        }
        return parts;
    }

    return (
        <div id="dateViewContainer">
            <div/>
            {daysOfWeekLabel()}
            <h3>Earned</h3>
            {earnedFields()}
            <h3>Spent</h3>
            {spentFields()}
        </div>
    )
}

export default DateView;