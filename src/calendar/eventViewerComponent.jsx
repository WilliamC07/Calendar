import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import CloseButton from '../components/closeButton.jsx';

import "./eventViewerComponent.css";

export default class EventViewerComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="right-wrapper" onKeyDown={this.test} >
                <div>
                    {this.topLevelParts()}
                </div>
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
}

EventViewerComponent.propTypes = {
    close: PropTypes.func,
    firstSelectedDate: PropTypes.instanceOf(Date),
    secondSelectedDate: PropTypes.instanceOf(Date),
};