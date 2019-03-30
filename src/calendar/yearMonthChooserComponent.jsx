import React, {Component} from "react";
import Button from 'react-bootstrap/Button'
import {months} from "./util.js";

export default class YearMonthChooserComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFocusedMonth: false
        }
    }

    render() {
        return (
            <div>
                {this.state.isFocusedMonth ?
                    this.renderMonthChooser() :
                    <Button type="button" className="btn btn-primary" onClick={() => this.setState({isFocusedMonth: true})}>{months[this.props.displayingDate.getMonth()]}</Button>}
                <Button type="button" className="btn btn-primary" onClick={() => this.updateDateDisplayingByYear(-1)}>&lt;</Button>
                <Button type="button" className="btn btn-primary" onClick={this.props.updateDisplayingDateToToday}>{this.props.displayingDate.getFullYear()}</Button>
                <Button type="button" className="btn btn-primary" onClick={() => this.updateDateDisplayingByYear(1)}>&gt;</Button>
            </div>
        );
    }

    renderMonthChooser = () => {
        return(
            <span>
                {months.map(((value, index) =>
                    <Button type="button"
                            className="btn btn-primary"
                            onClick={() => this.updateDateDisplayingByMonth(index)}
                            key={index}>
                        {value.substr(0, 3)}
                    </Button>
                ))}
            </span>
        )
    };

    updateDateDisplayingByMonth = (monthNumber) => {
        // go back to original view
        this.setState({isFocusedMonth: false});
        // update the calendar
        this.props.updateDisplayingDateMonth(monthNumber);
    };

    updateDateDisplayingByYear = (yearChange) => {
        // go back to original view
        this.setState({isFocusedMonth: false});
        // update the calendar
        this.props.updateDisplayingDateYear(this.props.displayingDate.getFullYear() + yearChange);
    };
}