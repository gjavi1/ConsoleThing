import React, { Component } from 'react';

class ConsoleMessage extends Component {

    render() {
        console.log(this.props);
        return <div className={`console-message${(this.props.type? ` console-message-${this.props.type}` : ``)}`}>
            {this.props.value}
        </div>;
    }
}

ConsoleMessage.defaultProps = {
	type: null,
	value: [],
}

export default ConsoleMessage;