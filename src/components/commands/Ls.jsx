export default class Ls {
	match() {
		return "ls";
	}
	
	do(command, env) {
		let command = command.split(" ")
		command.shift();
	}
}
