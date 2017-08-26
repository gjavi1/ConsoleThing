import React from 'react';
import Echo from './Echo';

export default class Lelecho {
    static match() {
        return "lelecho";
    }

    static do(command) {
        extractedSay = Echo.do(command).message;
        wrappedLines = Math.ceil(extractedSay.length / 80);
        return {message: 
            <span>
                {function () {
                    let outputString = '/';
                    for(let i = 0; i < extractedSay; i++) {
                        outputString = outputString + '-';
                    }
                    outputString = outputString + '\\';
                    outputString = <span>{outputString}<br/></span>;
                    return outputString;
                } 
                }
                {function() {
                    let finalString = <span>{outputString};
                    for (let i = 0; i < extractedSay.length, i++){
                        if (i % 80 == 0 && i != 0) {
                            outputString = ou  
                        } else {

                        }
                    }
                }
                }
            \   ^__^<br/>
             \  (oo)\_______<br/>
                (__)\       )\/\<br/>
                     ||----w |<br/>
                     ||     ||<br/>
            </span>
            
        };
    }
}