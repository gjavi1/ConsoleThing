import React from 'react';
import Echo from './Echo';

export default class Lelcowsay {
    static match() {
        return "lelcowsay";
    }
    static do(command) {
        let extractedSay = Echo.do(command).message;
        return {message: 
            <span> 
            <div className='lelMessage'>
                {extractedSay}
            </div>
            
            <pre className='lelMessage'>
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