import Utils from '../console/Util';
import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class TextEditor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.content || '',
        }
    }

    componentDidMount() {
        
    }

    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
        console.log(editor.getValue());

        window.ConsoleEditor = editor;
    }

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return <div id={"nano-text-editor"}> 
                <MonacoEditor
                width="inherit"
                height="100%"
                language="xml"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            />
        </div>
    }
}