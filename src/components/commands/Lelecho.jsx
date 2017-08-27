import React from 'react';
import Echo from './Echo';

export default class Lelecho {
    static match() {
        return "lelecho";
    }

    static do(command) {
        return {message: <span className='lelMessage'> {Echo.do(command).message} </span>};
    }

    static help() {
        return <span>lelecho &lt;STRING&gt; - Outputs a string in rainbow color</span>
    }
}