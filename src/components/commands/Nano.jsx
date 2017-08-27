import Utils from '../console/Util';
import React, {Component} from 'react';
import TextEditor from "../console/TextEditor";

export default class Nano {
    static match() {
        return "nano";
    }

    static do(command, env) {
        let commands = command.split(" ");
        let message = "";

        if (commands.length === 1) {
            return {message: "nano: missing file operand"};
        }

        commands.shift();
        
        if (commands.length > 1) {
            message = "nano: too manny file operand";
        } else {
            Utils.createFile(commands[0].trim());
        }

        return {message: <TextEditor content={"Hello from nano"} />}
    }
}
