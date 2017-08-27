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
        let fileContent = "";

        if (commands.length === 1) {
            return {message: "nano: missing file operand"};
        }

        commands.shift();
        
        if (commands.length > 1) {
            message = "nano: too manny file operand";
        } else {
            let fileId = Utils.checkFileExist(commands[0].trim());
            if (fileId) {
                console.log(fileId);
                fileContent = Utils.getFileData(fileId) ?  Utils.getFileData(fileId) : "";
            } else {
                Utils.createFile(commands[0].trim());
            }

            window.ConsoleEditorFileId = fileId;
        }

        return {message: <TextEditor content={fileContent} />}
    }
}
