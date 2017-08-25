import React, { Component } from 'react';

class ConsoleMessage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className={`react-console-message${(this.props.type? ` react-console-message-${this.props.type}` : ``)}`}>
            {this.props.value.map((val)=>{
                if(typeof val === 'string') {
                    console.log(val);
                    return val;
                } else {
                    return JSON.stringify(val);
                }
            }).join("\n")}
        </div>;
    }
}

ConsoleMessage.defaultProps = {
	type: null,
	value: [],
}

export default ConsoleMessage;