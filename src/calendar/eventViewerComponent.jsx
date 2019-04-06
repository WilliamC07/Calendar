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
        return (
            <div id="top-level">
                <CloseButton action={this.props.close}/>
                <Button type="button" className="btn btn-primary">&lt;</Button>

                <Button type="button" className="btn btn-primary">&gt;</Button>
            </div>
        );
    }
}

EventViewerComponent.propTypes = {
    close: PropTypes.func,
};