import React from 'react'
import {formatCurrency} from '../utility/money';
import {listDataForMoment} from './data.js';

function DateView({startingDate, setSelectedMoment}){

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
            parts.push(
                <h3 onClick={() => setSelectedMoment(startingDate.clone().day(day))} key={"earningDay"+day}>
                    {formatCurrency(getEarning(listDataForMoment(startingDate.clone().day(day))))}
                </h3>)
        }
        return parts;
    }

    function spentFields(){
        const parts = [];
        for(let day = 0; day < 7; day++){
            parts.push(
                <h3 onClick={() => setSelectedMoment(startingDate.clone().day(day))} key={"spendingDay"+day}>
                    {formatCurrency(getSpendings(listDataForMoment(startingDate.clone().day(day))))}
                </h3>)
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

function getSpendings(list){
    let spending = 0;
    for(let {amount} of list){
        amount += amount < 0 ? amount : 0;
    }
    return spending;
}

function getEarning(list){
    let earning = 0;
    for(let {amount} of list){
        amount += amount < 0 ? 0 : amount;
    }
    return earning;
}

export default DateView;