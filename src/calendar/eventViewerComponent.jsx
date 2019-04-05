import React, {Component} from "react";
import PropTypes from "prop-types";
import CloseButton from '../components/closeButton.jsx';

export default class EventViewerComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="right-wrapper">
                <div>
                    <CloseButton action={this.props.close}/>
                    
                </div>
            </div>
        );
    }
}

EventViewerComponent.propTypes = {
    close: PropTypes.func,
};