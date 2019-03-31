import React, {Component} from "react";
import {isCurrentDate} from "./util.js";

export default class DateComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                {this.headingLabel()}
            </div>
        )
    }

    headingLabel = () => {
        let date = this.props.date;
        let label = date.getDate() + "";
        let styleClasses = "";

        // first day of the display or first day of the month needs additional information
        if(this.props.index === 0 || date.getDate() === 1){
            label = (date.getMonth() + 1) + "/" + label;
        }

        if(isCurrentDate(date)){
            label += " - Today";
            styleClasses += "text-warning ";
        }

        return(
            <h5 className={styleClasses}>{label}</h5>
        );
    }
}