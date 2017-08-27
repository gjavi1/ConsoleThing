import Utils from '../console/Util';
import React, {Component} from 'react';

export default class Cat {
    static match() {
        return "cat";
    }

    static do(command, env) {
        let commands = command.split(" ");
        let message = "";

        if (commands.length === 1) {
            message = "Cat: missing file operand";
        }

        commands.shift();
        let fileId = Utils.checkFileExist(commands[0]);
        if (fileId) {
            message = <pre>{Utils.getFileData(fileId)}</pre>;
        } else {
            message = `cat: ${commands[0]}: No such file or directory`;
        }
        
        return {message: message}
    }
}