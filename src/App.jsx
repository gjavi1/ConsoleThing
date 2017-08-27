import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';

import Console from './components/Console';
import Utils from './components/console/Util';
import TextEditor from "./components/console/TextEditor";
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
        let currentFiles = localStorage.getItem("fileitems");

        if (currentFileSys) {
            localStorage.setItem('filesys', currentFileSys);
        } else {
            let baseSystem = {
                "hello.txt": 1
            }
            localStorage.setItem('filesys', '{}');            
        }

        if (currentFiles) {
            localStorage.setItem('fileitems', currentFiles);
        } else {
            localStorage.setItem('fileitems', '{}');            
        }
        
        window.onkeydown = function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                if (typeof window.ConsoleEditor !== "undefined") {
                    let fileData = window.ConsoleEditor.getValue();

                    // console.log(window.ConsoleEditorFileId);
                    Utils.createFileData(window.ConsoleEditorFileId, fileData);

                    window.ConsoleEditor = undefined;
                    // window.ConsoleEditorFileId = undefined;
                    document.getElementById('nano-text-editor').remove();
                }
            }
        };
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
