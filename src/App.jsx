import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Console from './components/Console'

class App extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          count: 0,
        };
    }

    child = {
        console: Console
    }
  
    echo = (text) => {
        this.child.console.log(text);
        this.setState({
          count: this.state.count+1,
        }, this.child.console.return);
    }
    
    promptLabel = () => {
        return this.state.count + "> ";
    }
    
    render() {
        return <Console ref={ref => this.child.console = ref}
            handler={this.echo}
            promptLabel={this.promptLabel}
            welcomeMessage={"ConsoleThingy"}
            autofocus={true}
            promptLabel= {'> '}
        />;
    }
}

export default App;
