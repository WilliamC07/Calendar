import React, {Component} from 'react'

class Exit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'X'
        }
    }

    render() {
        return (
            <div style={this.getWrapperStyle()}>
                <h1 style={{margin: "auto", fontSize: '50px', textAlign: 'center'}}>CLOSE</h1>
            </div>
        );
    }

    getWrapperStyle = () => {
        return{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '62px',
            width: '170px',
            borderStyle: 'solid'
        }
    }
}

export default Exit;