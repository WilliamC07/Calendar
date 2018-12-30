import React, {Component} from 'react';

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Default view is the one that is active without the mouse hovering over it
            // Extra view is the one that is active when the mouse is hovering over it
            active: false,
            title: "CALENDAR",
            date: new Date().getDate(),
            dayOfWeek: Calendar.getDayOfWeek(),
        };
    }

    render() {
        return(
            <div style={this.getWrapperStyle()}
                 onMouseEnter={this.showActive}
                 onMouseLeave={this.showInactive}>
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
            <React.Fragment>
                <div style={this.getCalendarWrapperStyle()}>
                    {this.createCalendarView()}
                </div>
            </React.Fragment>
        );
    }

    createCalendarView = () => {
        let parts = [];
        // Month display
        parts.push(
            <div key={"monthDisplay"} style={{gridColumn: "1 / -1", fontSize: "25px"}}>
                {new Date().toLocaleString('en-us', {month: "long"})}
            </div>
        );

        // Days of the week
        const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
        DAYS_OF_WEEK.forEach(
            (value, index) => parts.push(
                <div key={"dowCell"+index}>
                    {value}
                </div>)
        );

        // Days in the calendar
        let daysPastFirstSunday = 0;
        for(let row = 0; row < 6; row++){
            for(let column = 0; column < 7; column++){
                parts.push(
                    <div key={"cell"+daysPastFirstSunday}>
                        {this.getCalendarDate(daysPastFirstSunday)}
                    </div>
                );
                daysPastFirstSunday++;
            }
        }
        return parts;
    };

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

    getCalendarWrapperStyle(){
        return({
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridRowGap: "10px",
            textAlign: "center"
        });
    }

    static getDayOfWeek(){
        let options = {weekday: 'long'};
        let locale = 'en-us';
        return new Date().toLocaleDateString(locale, options).toUpperCase();
    }

    /**
     * Gives the day (a number) of the month since the first sunday. Finding the first Sunday is not that expensive to
     * figure out.
     * @param daysSinceFirstSunday What place the text will go (amount of days since the top left corner)
     * @returns {number} Day of the month
     */
    getCalendarDate = (daysSinceFirstSunday) => {
        const TODAY = new Date();
        let firstSunday = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
        while(firstSunday.getDay() !== 0){
            firstSunday.setDate(firstSunday.getDate() - 1);
        }

        firstSunday.setDate(firstSunday.getDate() + daysSinceFirstSunday);
        return firstSunday.getDate();
    }
}

export default Calendar;
