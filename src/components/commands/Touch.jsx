import Utils from '../console/Util';
import React from 'react';

export default class Touch {
    static match() {
        return "touch";
    }

    static do(command, env) {
        let commands = command.split(" ");
        let message = "";

        if (commands.length === 1) {
            message = "touch: missing file operand";
        }

        commands.shift();
        
        commands.forEach((val) => {
            Utils.createFile(val.trim());
        });
        
        return {message: message}
    }

    static help(){
        return <span>touch &lt;FILENAME&gt; - Creates a new file</span>
    }
}