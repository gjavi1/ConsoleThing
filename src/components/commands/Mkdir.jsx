import Utils from '../console/Util';

export default class Mkdir {
    static match() {
        return "mkdir"; 
    }

    static do(command, env) {
        const commands = command.split(" ");
        let success = true,
            message = "";


        if (commands.length === 1) {
            message = "mkdir: missing operand";
        }

        commands.forEach((val, index) => {
            if (!index && val !== "mkdir") {
                message = "Command Not Found";
            } else if (val !== "mkdir") {
                Utils.createDirectory(val.trim());
            }
        });
        return {message: message};
    }
}