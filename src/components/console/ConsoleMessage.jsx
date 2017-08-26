import React, { Component } from 'react';

class ConsoleMessage extends Component {

    render() {
        return <div className={`console-message${(this.props.type? ` console-message-${this.props.type}` : ``)}`}>
            this.props.val.message;
        </div>;
    }
}

ConsoleMessage.defaultProps = {
	type: null,
	value: [],
}

export default ConsoleMessage;