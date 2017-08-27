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
            <div className='cowMessage'>
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

    static help(){
        return <span>It is a cow that says things, nuff said.</span>
    }
}