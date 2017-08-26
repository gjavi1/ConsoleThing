import React, { Component } from 'react';
import './App.css';

import Console from './components/Console'

class App extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          user: "",
        };
    }

    child = {
        console: Console
    }
  
    echo = (text) => {
        this.child.console.log(text);
        this.setState({
          user: this.state.user,
        }, this.child.console.return);
    }
    
    promptLabel = () => {
        return this.state.user + " > ";
    }
    
    componentDidMount() {
        let currentFileSys = localStorage.getItem("filesys");

        if (currentFileSys) {
            localStorage.setItem('filesys', currentFileSys);
        } else {
            localStorage.setItem('filesys', '{}');            
        }
    }

    render() {
        return <Console ref={ref => this.child.console = ref}
            handler={this.echo}
            promptLabel={this.promptLabel()}
            welcomeMessage={"ConsoleThingy"}
            autofocus={true}
        />;
    }
}

export default App;
