import React, {Component} from 'react';

class Mail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // A view is active when the mouse is hovering over it. When it is hovering, it gives extra information
            active: false,
            title: "MAIL",
            unreadMailAmount: 0
        };
    }

    render() {
        return(
            <div style={this.getWrapperStyle()}
                 onMouseEnter={() => this.setActive(true)}
                 onMouseLeave={() => this.setActive(false)}>
                {this.state.active ? this.getActiveView() : this.getInactiveView()}
            </div>
        );
    }

    /**
     * Updates the state so the inactive/active view will be shown. The inactive view contains minimal information.
     * The active view contains more information for the user.
     */
    setActive = (isActive) => {
        this.setState({
            active: isActive
        });
    };

    getInactiveView = () => {
        return(
            <h1 style={this.getHeaderStyle()}>
                {this.state.title}
            </h1>
        );
    };

    getActiveView = () => {
        let text = this.state.unreadMailAmount === 0 ? 'No Mail' : this.state.unreadMailAmount.toString() + " unread";

        return(
            <h1 style={this.getHeaderStyle()}>
                {text}
            </h1>
        );
    };

    getWrapperStyle(){
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '240px',
            height: '62px',
        }
    }

    getHeaderStyle(){
        return {
            fontSize: '50px',
            margin: 'auto'
        }
    }
}

export default Mail;