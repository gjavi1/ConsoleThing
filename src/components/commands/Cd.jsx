import Utils from '../console/Util';

export default class Cd {
    static match() {
        return "cd";
    }

    static do(command, env) {
        let commands = command.split(" ");
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
            commands = path.split("/");
    
            commands.forEach((val) => {
                console.log("cd");
                console.log(val.trim());
                let status = Utils.navigateDir(val.trim());
                if (typeof success === 'undefined') {
                    success = status;
                    
                    if (!status) {
                        message = `cd: ${path}: No such file or directory`;
                    }
                } 
                
                if (success) {
                    success = status;
                } else {
                    message = `cd: ${path}: No such file or directory`;
                }         
            });

            output = {message: message, cdStatus: success, newPath: path};
        }
    
        return output;
    }
}