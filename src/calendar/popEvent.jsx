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
                <FontAwesomeIcon icon={faWindowClose}/>
                {this.titleComponent()}
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