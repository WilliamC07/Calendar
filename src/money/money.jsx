import React, {useState} from 'react';
import moment from "moment";
import DatePicker from "./datePicker";
import DateView from "./dateView";
import "./style.css";
import {getFileContent, setFileContent} from "../data";

function Money(props){
    const [startingDate, setStartingDate] = useState(moment().day(0));
    const [currentBalance, setCurrentBalance] = useState(0);

    setFileContent("money", "test.json", {test: true});

    return(
        <div>
            <DatePicker startingDate={startingDate} setStartingDate={setStartingDate}/>
            <h3>{"$" + currentBalance}</h3>
            <DateView startingDate={startingDate}/>
        </div>
    )
}

export default Money;