import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

class PopComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLookingAtDetailed: false,
        };
    }


    render() {
        return (
            <div style={this.getWrapperStyle()}>
                <button onClick={this.props.closePop}>X</button>
                {this.state.isLookingAtDetailed ? this.getDetailedView() : this.getEventsViewer()}

            </div>
        );
    }

    getWrapperStyle = () => {
        const spaceAmount = "100%";

        // Start with some default stuff that is shared between all
        const style = {
            background: "red",
            position: "absolute",
            // Prevents the user from clicking something behind the pop
            zIndex: "1",
            // size
            height: "250%",
            width: "150%",
        };

        // Note: Spacing to the left means it will be shifted to the right
        if(this.props.renderLeft){
            style.left = spaceAmount;
        }else{
            style.right = spaceAmount;
        }

        return style;
    };

    getEventsViewer = () => {
        return (
            <div>
                {/* Choose the event */}
                <div>
                    <div style={{position: "relative", display: "flex", justifyContent: "center"}}>
                        <button style={{position: "absolute", top: 0, height: "100%", left: "5px"}}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <h3 style={{display: "inline", margin: "0"}}>Stuff to do title</h3>
                        <button style={{position: "absolute", top: 0, height: "100%", right: "5px"}}>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
                </div>
                {/* event details */}
                <div>

                </div>
            </div>
        )
    };

    getDetailedView = () => {
        return (
            <div>
                detailed :o
            </div>
        )
    };
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar
    };
}

function mapDispatchToProps(dispatch){
    return {
        closePop: (e) => {
            e.stopPropagation(); // prevent selecting the calendar day underneath
            dispatch(actions.highlightIndex(-1))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopComponent);