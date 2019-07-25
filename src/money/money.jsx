import React, {useState} from 'react';
import moment from "moment";
import DatePicker from "./datePicker";
import DateView from "./dateView";
import DateBreakdown from "./dateBreakdown";
import "./style.css";

function Money(props){
    const [startingDate, setStartingDate] = useState(moment().day(0));
    const [currentBalance, setCurrentBalance] = useState(0);
    const [selectedMoment, setSelectedMoment] = useState(null);

    return(
        <div>
            <DatePicker startingDate={startingDate} setStartingDate={setStartingDate}/>
            <h3>{"$" + currentBalance}</h3>
            <DateView startingDate={startingDate} setSelectedMoment={setSelectedMoment}/>
            <div>
                {selectedMoment == null ? "" : <DateBreakdown selectedMoment={selectedMoment} setSelectedMoment={setSelectedMoment}/>}
            </div>
        </div>
    )
}

export default Money;