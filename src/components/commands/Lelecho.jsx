import React from 'react';
import Echo from './Echo';

export default class Lelecho {
    static match() {
        return "lelecho";
    }

    static do(command) {
        return {message: <div className='lelMessage'> {Echo.do(command).message} </div>};
    }

    static help() {
        return <span>lelecho &lt;STRING&gt; - Outputs a string in rainbow color</span>
    }
}