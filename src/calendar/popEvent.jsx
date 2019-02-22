import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Event from './event.js';

class PopEvent extends Component {
    /**
     * For when the user edits the event detail
     */
    #title = "";
    #time = {};
    #description = "";

    constructor(props) {
        super(props);
        this.state = {
            currentEventIndex: 0,
        };
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faWindowClose} onClick={(e) => this.props.onClose(e)}/>
                {this.eventChooserComponent()}
                {this.eventBodyComponent()}
            </div>
        );
    }

    eventChooserComponent = () => {
        const parentStyle = {
            position: "relative",
            display: "flex",
            justifyContent: "center"
        };

        return (
            <div style={parentStyle}>
                <button style={{position: "absolute", top: 0, height: "100%", left: "5px"}}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <h3 style={{display: "inline", margin: "0"}}>Stuff to do title</h3>
                <button style={{position: "absolute", top: 0, height: "100%", right: "5px"}}
                        onClick={() => this.changeEventBody(1)}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        );
    };

    changeEventBody = (change) => {
        let newEventCurrentIndex = this.state.currentEventIndex + change;
        if(newEventCurrentIndex < 0){

        }
        this.setState({
            currentEventIndex: newEventCurrentIndex
        });
    };

    eventBodyComponent = () => {
        const parentStyle = {
            padding: "5px"
        };

        const divStyle = {
            margin: 0,
            marginTop: "5px",
            display: "inline"
        };

        return (
            <div style={parentStyle}>
                <div>
                    <h3 style={divStyle}>Title:</h3>
                    <input type={"text"} onChange={(event) => this.onUserTextEnter(event, "title")} ref={"title"}/>
                </div>
                <div>
                    <h3 style={divStyle}>Time:</h3>
                </div>
                <div>
                    <h3 style={divStyle}>Description:</h3>
                    <input type={"text"} onChange={(event) => this.onUserTextEnter(event, 'description')} ref={"description"}/>
                </div>
            </div>
        )
    };

    getStyle = () => {
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
        if(this.props.renderOnLeft){
            style.right = spaceAmount;
        }else{
            style.left = spaceAmount;
        }

        return style;
    };

    onUserTextEnter = (event, type) => {
        switch(type){
            case 'title':
                this.#title = this.refs.title.value;
                break;
            case 'description':
                this.#description = this.refs.description.value;
                break;
            default:
                console.log("don't know what to update -- popEvent.jsx")
        }
    }

    /**
     * If the popevent is being removed from the view, the information done, if any, on the event the user is looking
     * at will be updated.
     */
    componentWillUnmount() {
        this.saveEvent();
    }

    saveEvent = () => {
        this.props.saveContent(new Event());
    };
}

export default PopEvent;