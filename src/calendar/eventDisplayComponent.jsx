import React, {Component} from "react";
import PropTypes from 'prop-types';
import './eventDisplayComponent.css';

export default class EventDisplayComponent extends Component{
    render() {
        return(
            <div>
                <h5 className="event-display-title-text">{this.props.event._title}</h5>
            </div>
        )
    }
}

EventDisplayComponent.propTypes = {
    event: PropTypes.instanceOf(Event),
};