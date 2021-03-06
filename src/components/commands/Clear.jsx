import React from 'react';

class Clear {
    static match() {
        return "clear";
    }
    static do() {
        let prompts = Array.from(document.getElementsByClassName("console-prompt-box"));
        let promptSize = prompts.length - 1;

        prompts.forEach(function(element, index) {
            if (promptSize !== index) {
                element.remove();
            }
        });

        Array.from(document.getElementsByClassName("console-message")).forEach(function(element, id) {
            if (0 !== id) {
                element.remove();
            }
        });
        return {message: "Cleared", appendLog: false};
    }
    static help() {
        return <span>clear - Clears the terminal</span>
    }
}

export default Clear;