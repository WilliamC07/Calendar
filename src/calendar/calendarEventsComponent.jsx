import React from 'react';

/**
 * Stateless
 */
class CalendarEventsComponent extends React.Component{
    render() {
        return (
            <div>
                {this.eventsContainer(this.props.events)}
            </div>
        );
    }

    /**
     *
     * @param events Must be in order by position (lower number comes first)
     */
    eventsContainer = (events) => {
        const parts = [];
        const style = {
            // size
            width: "100%",
            height: "25px",
            overflow: "hidden"
        };

        for(let event of events){
            style["color"] = event.color == null ? "#3f3f3f" : event.color;
            parts.push(
                <div style={style}>
                    {event.title}
                </div>
            )
        }
    }

}

export default CalendarEventsComponent;