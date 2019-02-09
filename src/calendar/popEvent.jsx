import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {stringRepresentation} from './util.js';

class PopEvent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faWindowClose} onClick={(e) => this.props.onPopEventClose(e)}/>
                {this.titleComponent()}
                {this.eventChooserComponent()}
                {this.eventBodyComponent()}
            </div>
        );
    }

    titleComponent = () => {
        const arrowStyle = {position: "absolute", top: "0", height: "100%"};
        if(this.props.information.isLeftSide){
            arrowStyle.right = "5";
        }else{
            arrowStyle.left = "5";
        }

        return(
            <div style={{display: "flex", position: "relative", justifyContent: "center"}}>
                <h3 style={{display: "inline", margin: "0"}}>{stringRepresentation(this.props.information.date)}</h3>
                <FontAwesomeIcon style={arrowStyle} icon={this.props.information.isLeftSide ? faArrowRight : faArrowLeft}/>
            </div>
        );
    };

    eventChooserComponent = () => {
        const parentStyle = {
            position: "relative",
            display: "flex",
            justifyContent: "center"
        };

        return (
            <div style={parentStyle}>
                <FontAwesomeIcon style={{position: "absolute", top: 0, height: "100%", left: "5px"}} icon={faArrowLeft}/>
                <h3 style={{display: "inline", margin: "0"}}>Stuff to do title</h3>
                <FontAwesomeIcon style={{position: "absolute", top: 0, height: "100%", right: "5px"}} icon={faArrowRight}/>
            </div>
        );
    }

    eventBodyComponent = () => {
        const parentStyle = {
            padding: "5px"
        };

        const divStyle = {
            margin: 0,
            marginTop: "5px",
        };

        return (
            <div style={parentStyle}>
                <h3 style={divStyle}>Title:</h3>
                <h3 style={divStyle}>Time:</h3>
                <h3 style={divStyle}>Description:</h3>
            </div>
        )
    }

    getStyle = () => {
        const information = this.props.information;
        const spaceAmount = "100%";

        // Start with some default stuff that is shared between all
        const style = {
            background: "red",
            position: "absolute",
            // Prevents the user from clicking something behind the pop
            zIndex: "1",
            // size
            height: "200%",
            width: "150%",
        };

        // Note: Spacing to the left means it will be shifted to the right
        if(information.isLeftSide){
            style.right = spaceAmount;
        }else{
            style.left = spaceAmount;
        }

        return style;
    }
}

export default PopEvent;