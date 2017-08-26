export default class Echo {
    static match() {
        return "echo";
    }

    static do(command) {
        let commandstring = command.split(" ")
		commandstring.shift();
        return {message: commandstring.join(" ")};
    }
}