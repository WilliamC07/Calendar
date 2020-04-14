import React, {useEffect, useState} from 'react';
import "./timePickerStyle.scss";
import moment, {Moment} from "moment";

interface Props {
    current: moment.Moment,
    update: (moment: moment.Moment, isValid: boolean) => void,
}

const TimePicker: React.FC<Props> = ({update, current}) => {
    const [hour, setHour] = useState<number>(parseInt(current.format("hh")));
    const [minute, setMinute] = useState<number>(current.get("minute"));
    const [isAM, setIsAM] = useState<boolean>(current.get("hour") < 12);
    const [editingIndex, setEditingIndex] = useState<number>(0); // 0 for hour, 1 for minute, 2 for isAM
    const [mistake, setMistake] = useState<string>("");

    useEffect(() => {
        // validate
        if(hour > 12 || hour <= 0 || minute <= 0 || minute >= 60){
            update(current, false);
            console.log("updating");
            setMistake("Invalid time");
            return;
        }
        // no mistake
        setMistake("");

        const copy = current.clone();
        const newTime = moment(`${hour}:${minute} ${isAM ? "AM" : "PM"}`, ["h:mm A"]);
        copy.set({minute: newTime.get("minute"), hour: newTime.get("hour")});
        update(copy, true);
    }, [hour, minute, isAM]);

    function handleKeyPress(e: React.KeyboardEvent){
        // we know it is of type "string", but isNaN accepts number only and we want to pass in a string
        const key: any = e.key;
        if(key === "Tab" || key === "ArrowRight"){
            // editing field to right (or wrap around)
            setEditingIndex((editingIndex + 1) % 3);
        }else if(key === "ArrowLeft") {
            // editing field to left (or wrap around)
            setEditingIndex(editingIndex === 0 ? 2 : editingIndex - 1);
        }else if(key === "Backspace") {
            // remove last digit from field
            switch(editingIndex){
                case 0: {
                    const hourString = String(hour);
                    let newHour = hourString.substring(0, hourString.length - 1);
                    if(newHour === ""){
                        // user cleared field
                        setHour(0);
                    }else{
                        setHour(parseInt(newHour));
                    }
                } break;
                case 1: {
                    const minuteString = String(minute);
                    let newMinute = minuteString.substring(0, minuteString.length - 1);
                    if(newMinute === ""){
                        // user cleared field
                        setMinute(0);
                    }else{
                        setMinute(parseInt(newMinute));
                    }
                } break;
            }
        }else{
            // entering field
            switch(editingIndex){
                case 0:{
                    // entering hour field
                    if(isNaN(key)) return;
                    setHour(parseInt(String(hour) + key));
                } break;
                case 1:{
                    // entering minute field
                    if(isNaN(key)) return;
                    setMinute(parseInt(String(minute) + key));
                } break;
                case 2:{
                    // entering am/pm field
                    if(key === 'a'){
                        setIsAM(true);
                    }else if(key === 'p'){
                        setIsAM(false);
                    }

                } break;
            }
        }

        // prevent default action of tab
        e.preventDefault();
    }

    function hourDisplay(): string {
        return hour === 0 ? "h" : String(hour);
    }
    function minuteDisplay(): string {
        // minute formatted as "mm"
        // Examples: "01", "24"
        return minute === 0 ? "mm" : String(minute).padStart(2, '0');
    }

    return (
        <span className="timePickerContainer" onKeyDown={handleKeyPress} tabIndex={0}>
            {/* format as H:MM <AM/PM> */ }
            <span data-selected={editingIndex === 0}>{hourDisplay()}</span>
            <span>:</span>
            <span data-selected={editingIndex === 1}>{minuteDisplay()}</span>
            <span data-selected={editingIndex === 2}>{`${isAM ? "AM" : "PM"}`}</span>
            <span style={{color: "red"}}>{mistake}</span>
        </span>
    )
};

export default TimePicker;