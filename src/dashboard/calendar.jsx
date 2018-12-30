import React, {Component} from 'react';

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "CALENDAR",
            date: new Date().getDate(),
            dayOfWeek: Calendar.getDayOfWeek()
        };
    }

    render() {
        return(
            <div style={this.getWrapperStyle()}>
                <h1 style={this.getHeaderStyle(35)}>
                    {this.state.title}
                </h1>
                <h1 style={this.getHeaderStyle(110)}>
                    {this.state.date}
                </h1>
                <h1 style={this.getHeaderStyle(30)}>
                    {this.state.dayOfWeek}
                </h1>
            </div>
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
