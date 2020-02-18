import React, {useState} from "react";
import "./style.scss";
import moment from "moment";

interface Props {
    startingMoment: moment.Moment;
    setSelectedMoment: (moment: moment.Moment) => void;
    isAbove: boolean
}

const MomentPicker: React.FC<Props> = ({startingMoment, setSelectedMoment, isAbove}) => {
    const [viewingMoment, setViewingMoment] = useState(startingMoment);
    const [isSelecting, setSelecting] = useState(false);

    function daysToShow(){
        const elements = [];
        const firstSunday = viewingMoment.clone().date(1).day(0);

        for(let i = 0; i < 6 * 7; i++){
            const currentMoment = firstSunday.clone().day(i);
            const today = moment();
            let styleClass = "";
            if(currentMoment.isSame(startingMoment, "day")){
                styleClass = "selectedText";
            }else if(currentMoment.isSame(today, "day")){
                styleClass = "currentText";
            }
            elements.push(
                <div key={currentMoment.format("pickerMMMDYYYY")}
                     className={styleClass}
                     onClick={(e) => {
                         e.preventDefault(); // don't click what is underneath
                         setSelectedMoment(currentMoment);
                         setViewingMoment(currentMoment);
                         setSelecting(false);
                     }}>
                    {currentMoment.date()}
                </div>
            );
        }

        return elements;
    }

    return (
        <div className={"momentPickerContainer " + (isAbove ? "above" : "")}>
            {
                <div className="selectedMoment" onClick={() => setSelecting(!isSelecting)}>
                    {startingMoment.format("M/D/YY")}
                </div>
            }
            {isSelecting &&
            <div className="pickerWrapper">
                <div className="header">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setViewingMoment(viewingMoment.clone().subtract(1, "months"));
                    }}>{"<"}</button>
                    <div>{viewingMoment.format("MMM YYYY")}</div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setViewingMoment(viewingMoment.clone().add(1, "months"));
                    }}>{">"}</button>
                </div>
                <div className="daysContainer">
                    {daysToShow()}
                </div>
            </div>
            }
        </div>
    )
};

export default MomentPicker;