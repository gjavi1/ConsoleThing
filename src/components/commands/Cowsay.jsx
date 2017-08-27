import React from 'react';
import Echo from './Echo';

export default class Cowsay {
    static match() {
        return "Cowsay";
    }

    static do(command) {
        let extractedSay = Echo.do(command).message;
        return {message: 
            <span> 
            <div >
                {extractedSay}
            </div>
            
            <pre>
\   ^__^<br/>
{' '}\  (oo)\_______<br/>
{'    '}(__)\       )\<br/>
{'        '}||----w |<br/>
{'        '}||     ||<br/>   
            </pre>
            </span>
        };
    }
}