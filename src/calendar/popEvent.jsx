import React, {Component} from 'react';

class PopEvent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <h1>Apples are great</h1>
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