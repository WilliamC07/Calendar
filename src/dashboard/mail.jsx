import React, {Component} from 'react';

class Mail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "MAIL"
        };
    }

    render() {
        return(
            <div style={this.getWrapperStyle()}>
                <h1 style={this.getHeaderStyle()}>
                    {this.state.title}
                </h1>
            </div>
        );
    }

    getWrapperStyle(){
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '240px',
            height: '62px',
            borderStyle: 'solid'
        }
    }

    getHeaderStyle(){
        return {
            fontSize: '60px',
            margin: 'auto'
        }
    }
}

export default Mail;