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
                    <Button type="button" className="btn btn-primary" onClick={() => this.setState({isFocusedMonth: true})}>Primary</Button>}

            </div>
        );
    }

    renderMonthChooser = () => {
        return(
            <ul className="pagination">
                {months.map(((value, index) =>
                        <li className="page-item" key={value}>
                            <div className="page-link" onClick={() => this.updateDateDisplayingByMonth(index)}>{value}</div>
                        </li>
                ))}
            </ul>
        )
    };

    updateDateDisplayingByMonth = (monthNumber) => {
        // go back to original view
        this.setState({isFocusedMonth: false});
        // update the calendar
        this.props.updateDisplayingDateMonth(monthNumber);
    }
}