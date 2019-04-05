import React, {Component} from "react";
import PropTypes from "prop-types";

export default class CloseButton extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <button type="button" className="btn btn-danger" onClick={this.props.action}>&#10005;</button>
        );
    }
}

CloseButton.propTypes = {
    action: PropTypes.func,
};