import React, { Component } from 'react';

class ConsoleMessage extends Component {

    render() {
        return <div className={`console-message${(this.props.type? ` console-message-${this.props.type}` : ``)}`}>
            {this.props.value.map((val)=>{
                if(typeof val === 'string') {
                    //console.log(val);
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