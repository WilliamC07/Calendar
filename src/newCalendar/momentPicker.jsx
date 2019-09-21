import React, {useState} from "react";
import "./style.scss";

export default function MomentPicker({startingMoment, setSelectedMoment}){
    const [viewingMoment, setViewingMoment] = useState(startingMoment);
    const [isSelecting, setSelecting] = useState(false);

    function daysToShow(){
        const elements = [];
        const firstSunday = viewingMoment.clone().date(1).day(0);

        for(let i = 0; i < 6 * 7; i++){
            const currentMoment = firstSunday.clone().day(i);
            elements.push(
                <div key={currentMoment.format("pickerMMMDYYYY")} onClick={() => setSelectedMoment(currentMoment)}>
                    {currentMoment.date()}
                </div>
            );
        }

        return elements;
    }

    return (
        <div className="momentPickerContainer">
            {
                <div className="selectedMoment" onClick={() => setSelecting(!isSelecting)}>
                    {viewingMoment.format("M/D/YY")}
                </div>
            }
            {isSelecting &&
                <div className="pickerWrapper">
                    <div className="header">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setViewingMoment(viewingMoment.clone().subtract(1, "months"));
                            setSelecting(!isSelecting);
                        }}>{"<"}</button>
                        <div>{viewingMoment.format("MMM YYYY")}</div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setViewingMoment(viewingMoment.clone().add(1, "months"));
                            setSelecting(!isSelecting);
                        }}>{">"}</button>
                    </div>
                    <div className="daysContainer">
                        {daysToShow()}
                    </div>
                </div>
            }
        </div>
    )
}