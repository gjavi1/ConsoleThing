import Utils from '../console/Util';
import React from 'react';

export default class Rm {
    static match() {
        return "rm";
    }

    static do(command, env) {
        let commands = command.split(" ");
        let message = "";

        if (commands.length === 1) {
            message = "rm: missing operand";
        }

        commands.shift();
        
        commands.forEach((val) => {
            Utils.removeDirectory(val.trim());
        });
        
        return {message: message}
    }

    static help() {
        return <span>Deletes things</span>
    }
}