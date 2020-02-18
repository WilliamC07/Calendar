import React, {useState} from 'react';
import "./timePickerStyle.scss";
import moment from "moment";

interface Props {
    current: moment.Moment,
    update: (moment: moment.Moment) => void,
}

const TimePicker: React.FC<Props> = ({update, current}) => {
    const [hour, setHour] = useState(parseInt(current.format("hh")));
    const [minute, setMinute] = useState(current.get("minute"));
    const [isAM, setIsAM] = useState(current.get("hour") < 12);
    const [editingIndex, setEditingIndex] = useState(0); // 0 for hour, 1 for minute, 2 for isAM

    function handleKeyPress(e: React.KeyboardEvent){
        // we know it is of type "string", but isNaN accepts number only and we want to pass in a string
        const key: any = e.key;
        if(key === "Tab" || key === "ArrowRight"){
            // editing field to right (or wrap around)
            setEditingIndex((editingIndex + 1) % 3);
        }else if(key === "ArrowLeft"){
            // editing field to left (or wrap around)
            setEditingIndex(editingIndex === 0 ? 2 : editingIndex - 1);
        }else{
            // entering field
            switch(editingIndex){
                case 0:{
                    // entering hour field
                    if(isNaN(key)) return;
                    const number = parseInt(key);
                    if(hour === 1){
                        if(number > 2){
                            // hour can't be >12, so the user must be editing the minute field
                            setEditingIndex(1);
                            setMinute(number);
                        }else{
                            // user is finishing the hour field
                            setHour(number + 10);
                            setEditingIndex(1);
                        }
                    }else{
                        // user is resetting the field
                        if(number > 1){
                            // single digit hour field, so move on to minute field
                            setHour(number);
                            setEditingIndex(1);
                        }else if(number === 1){
                            // user can either do 1x:xx or 1:xx. user must click arrow/tab key to move on
                            setHour(number);
                        }
                    }
                    break;
                }
                case 1:{
                    // entering minute field
                    if(isNaN(key)) return;
                    const number = parseInt(key);
                    if(minute > 5 || minute === 0){
                        // either replacing minute or first time setting minute field, so accept anything
                        if(number === 0 || number > 5){
                            // minute tens place cannot be greater than 5, so we can move on to am_pm field now
                            // user does not explicitly set the tens place to 0, if they enter number > 5, it autoplaces 0
                            setMinute(number);
                            setEditingIndex(2);
                        }else{
                            // number is between [1, 5], which means it goes to the tens place of minute
                            setMinute(number);
                        }
                    }else if(minute >= 1 && minute <= 5){
                        // can fill out ones place of the minute and move on
                        setMinute(minute * 10 + number);
                        setEditingIndex(2);
                    }
                    break;
                }
                case 2:{
                    // entering am/pm field
                    if(key === 'a'){
                        setIsAM(true);
                    }else if(key === 'p'){
                        setIsAM(false);
                    }
                    break;
                }
            }
        }
        // bro what is this ternary... :(
        update(current.clone().set({minute, hour: hour + (isAM ? (hour === 12 ? -12 : 0) : (hour === 12 ? 0 : 12))}));
        // prevent default action of tab
        e.preventDefault();
    }

    return (
        <span className="timePickerContainer" onKeyDown={handleKeyPress} tabIndex={0}>
            {/* format as H:MM <AM/PM> */ }
            <span data-selected={editingIndex === 0}>{hour}</span><span data-selected={editingIndex === 1}>{`:${String(minute).padStart(2, '0')}`}</span><span data-selected={editingIndex === 2}>{`${isAM ? "AM" : "PM"}`}</span>
        </span>
    )
};

export default TimePicker;