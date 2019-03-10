import React, {Component} from 'react';
import {connect} from 'react-redux';

class PopComponent extends Component{
    render() {
        return (
            <div style={this.getWrapperStyle()}>

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
            height: "200%",
            width: "150%",
        };

        // Note: Spacing to the left means it will be shifted to the right
        if(this.props.renderLeft){
            style.left = spaceAmount;
        }else{
            style.right = spaceAmount;
        }

        return style;
    }
}

// Container part of redux
function mapStateToProps(state){
    return {
        calendar: state.calendar
    };
}

export default connect(mapStateToProps)(PopComponent)