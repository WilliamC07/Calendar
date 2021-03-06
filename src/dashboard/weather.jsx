import React, {Component} from 'react';

class Weather extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div style={this.getWrapperStyle()}>
                <h1 style={this.getHeaderStyle()}>
                    WEATHER
                </h1>
            </div>
        )
    }

    getWrapperStyle = () => {
        return{
            width: '448px',
            height: '182px',
        }
    }

    getHeaderStyle = () => {
        return{
            fontSize: '35px',
            margin: '5px 0 0 5px'
        }
    }
}

export default Weather;