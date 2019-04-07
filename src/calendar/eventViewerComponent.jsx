import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import CloseButton from '../components/closeButton.jsx';
import Event, {isValidTitle} from "./event";

import "./eventViewerComponent.css";

export default class EventViewerComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    render() {
        return(
            <div id="right-wrapper" onKeyDown={this.test} >
                {this.topLevelParts()}
                {this.userInputTitle()}
            </div>
        );
    }

    topLevelParts = () => {
        const headerDateOptions = {weekday: "long", month: "short", year: "numeric", day: "numeric"};
        return (
            <div id="top-level">
                <CloseButton action={this.props.close}/>
                <h5 className="top-header-label text-success">
                    {this.props.firstSelectedDate.toLocaleString('en-us', headerDateOptions)}
                </h5>
            </div>
        );
    }
    userInputTitle = () => {
        const updateTitle = (event) => this.setState({title: event.target.value});
        return(
            <div className="input-container">
                <h5 className="input-label">Title:</h5>
                <input type="text" onChange={updateTitle} value={this.state.title}/>
            </div>
        )
    };
    userInputDates = () => {
        return(
            <div>

            </div>
        )
    }
}

EventViewerComponent.propTypes = {
    close: PropTypes.func,
    firstSelectedDate: PropTypes.instanceOf(Date),
    secondSelectedDate: PropTypes.instanceOf(Date),
};