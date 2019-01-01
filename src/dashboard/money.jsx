import React, {Component} from 'react'

class Money extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'MONEY'
        }
    }

    render() {
        return (
            <div style={this.getWrapperStyle()}>
                <h1 style={{margin: "auto", fontSize: '50px', textAlign: 'center'}}>{this.state.title}</h1>
            </div>
        );
    }

    getWrapperStyle = () => {
        return{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '62px',
            width: '185px',
        }
    }
}

export default Money;