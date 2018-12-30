import React, {Component} from 'react';

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false,

            // Default view is the one that is active without the mouse hovering over it
            title: "CALENDAR",
            date: new Date().getDate(),
            dayOfWeek: Calendar.getDayOfWeek()

            // Extra view is the one that is active when the mouse is hovering over it

        };
    }

    render() {
        return(
            <div style={this.getWrapperStyle()} onMouseEnter={this.showActive} onMouseLeave={this.showInactive}>
                {this.state.active ? this.getActiveView() : this.getInactiveView()}
            </div>
        );
    }

    /**
     * Updates the state so the inactive view will be shown. The inactive view contains minimal information.
     */
    showInactive = () => {
        this.setState({
            active: false
        });
    };

    /**
     * Updates the state so the active view will be shown. The active view contains more information for the user.
     */
    showActive = () => {
        this.setState({
            active: true
        });
    };

    getInactiveView(){
        return(
            <React.Fragment>
                <h1 style={this.getHeaderStyle(35)}>
                    {this.state.title}
                </h1>
                <h1 style={this.getHeaderStyle(110)}>
                    {this.state.date}
                </h1>
                <h1 style={this.getHeaderStyle(30)}>
                    {this.state.dayOfWeek}
                </h1>
            </React.Fragment>
        );
    }

    getActiveView(){
        return(
            <React.Fragment/>
        );
    }

    getWrapperStyle(){
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '240px',
            height: '240px',
            borderStyle: 'solid'
        }
    }

    getHeaderStyle(fontSize){
        return {
            fontSize: fontSize,
            margin: 'auto'
        }
    }

    static getDayOfWeek(){
        let options = {weekday: 'long'};
        let locale = 'en-us';
        return new Date().toLocaleDateString(locale, options).toUpperCase();
    }
}

export default Calendar;
