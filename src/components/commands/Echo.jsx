import React from 'react';

export default class Echo {
    static match() {
        return "echo";
    }

    static do(command) {
        let commandstring = command.split(" ")
		commandstring.shift();
        return {message: commandstring.join(" ")};
    }

    static help() {
        return <span>echo &lt;STRING&gt; - Outputs a string</span>
    }
}