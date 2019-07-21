import React, {useState} from 'react';
import moment from "moment";
import DatePicker from "./datePicker";
import "./style.css";

function Money(props){
    const [startingDate, setStartingDate] = useState(moment().day(0));

    return(
        <div>
            <DatePicker startingDate={startingDate} setStartingDate={setStartingDate}/>
        </div>
    )
}

export default Money;