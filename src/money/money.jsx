import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from "moment";
import DatePicker from "./datePicker";
import DateView from "./dateView";
import DateBreakdown from "./dateBreakdown";
import "./style.css";

function ConnectedMoney({currentBalance}){
    const [startingDate, setStartingDate] = useState(moment().day(0));
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

function mapStateToProps(state){
    return {
        currentBalance: state.money.currentBalance,
    }
}

const Money = connect(mapStateToProps)(ConnectedMoney);

export default Money;