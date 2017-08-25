import React, { Component } from 'react';
import History from './History.jsx';
import CommandLine from './CommandLine.jsx';

class Console extends Component {
    constructor(props) {
        super(props);
        this.pwd = "/";
    }

    render() {
        return (
            <div>
                <History />
                <CommandLine pwd={this.pwd} />
            </div>
        );
    }
}
