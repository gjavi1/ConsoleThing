import Utils from '../console/Util';
import React from 'react';

export default class Cd {
    static match() {
        return "cd";
    }

    static do(command, env) {
        let commands = command.trim().split(" ");
        let success;
        let message = "";
        let output = {};

        commands.shift();
        
        if (commands.length > 1) {
            output = {message: "cd: too many arguments"};
        } else if (!commands.length) {
            Utils.navigateDir("/");
            output = {message: message, cdStatus: true, newPath: "/"};
        } else {
            let path = commands.join(" ");
            let originalPath = Utils.currentDir;
            commands = path.split("/");
            
            commands.forEach((val) => {

                if (!val) {
                    return;
                }
                
                let status = Utils.navigateDir(val.trim());
                if (typeof success === 'undefined') {
                    success = status;
                    
                    if (!status) {
                        message = `cd: ${path}: No such file or directory`;
                        Utils.currentDir = originalPath;
                    }
                } 
                
                if (success) {
                    success = status;
                } else {
                    message = `cd: ${path}: No such file or directory`;
                    Utils.currentDir = originalPath;
                }         
            });
            output = {message: message, cdStatus: success, newPath: Utils.currentDir};
        }
    
        return output;
    }

    static help() {
        return <span>Changes directory</span>
    }
}