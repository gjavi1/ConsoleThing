import Utils from '../console/Util';
import React, {Component} from 'react';
import MonacoEditor from 'react-monaco-editor';

class NanoEditor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code...',
        }
    }

    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        const requireConfig = {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
            paths: {
                'vs': 'https://unpkg.com/monaco-editor@0.7.0/min/vs'
            }
        };
        return <div id={"nano-text-editor"}> 
                <MonacoEditor
                width="800"
                height="600"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
                requireConfig={requireConfig}
            />
        </div>
    }
}