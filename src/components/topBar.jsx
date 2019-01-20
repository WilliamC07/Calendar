import React, {Component} from 'react';

class TopBar extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const information = this.props.information;

        return (
            <div>
                <h1>{information.name}</h1>
            </div>
        );
    }
}

export default TopBar;