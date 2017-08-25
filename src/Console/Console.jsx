import React, { Component } from 'react';
import History from './History.jsx';
import CommandLine from './CommandLine.jsx';

class Console extends Component {


    render() {
        return (
            <div>
                <History />
                <CommandLine />
            </div>
        );
    }
}