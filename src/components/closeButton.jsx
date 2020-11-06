import React, {Component} from "react";

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