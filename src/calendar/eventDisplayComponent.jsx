import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class EventDisplayComponent extends Component{
    render() {
        return(
            <div>
                {this.props.event._title}
            </div>
        )
    }
}

EventDisplayComponent.propTypes = {
    event: PropTypes.instanceOf(Event),
};