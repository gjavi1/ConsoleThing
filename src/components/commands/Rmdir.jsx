import Utils from '../console/Util';
import React from 'react';

export default class Rmdir {
    static match() {
        return "rmdir"; 
    }

    static do(command, env) {
        const commands = command.split(" ");
        let message = "",
            missingDirs = [];

        if (commands.length === 1) {
            message = "rmdir: missing operand";
        }

        commands.forEach((val, index) => {
            if (!index && val !== "rmdir") {
                message = "Command Not Found";
            } else if (val !== "rmdir") {
                const removeStatus = Utils.removeDirectory(val.trim());
                if (!removeStatus) {
                    missingDirs.push(val.trim());
                }
            }
        });

        if (missingDirs.length) {
            message = "rmdir: failed to remove ";

            missingDirs.forEach((val, index) => {
                if (index) {
                    message += ",";
                } 

                message += `'${val}'`;
            });

            message += `: No such file or directory`;
        }
        return {message: message};
    }

    static help() {
        return <span>rmdir &lt;FOLDERNAME&gt; - Deletes a folder</span>
    }
}