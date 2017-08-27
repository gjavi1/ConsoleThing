import React from 'react';
import ErrorMessage from '../ErrorMessage.jsx';

export default class Help {
    static match() {
        return "help";
    }

    static do(command, env) {
        let args = command.split(" ");
        let cmdList = env.commands;
        switch (args.length) {
            case 1:
                return {message: "Use `help COMMANDNAME` to get help on a specific comand"};
            case 2:
                let cmdIdx = cmdList.map((e) => e.match().toLowerCase()).indexOf(args[1].toLowerCase())
                if (cmdIdx != -1) {
                    return {message: cmdList[cmdIdx].help()};
                } else {
                    return {message: <ErrorMessage message="Help cannot be displayed. Command not found." /> };
                }
                break;
            default:

        }
    }

    static help() {
        return <span>help [COMMANDNAME] - Gets help on a specific command else gets this message</span>
    }
}