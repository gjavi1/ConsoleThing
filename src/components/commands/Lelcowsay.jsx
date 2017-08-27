import React from 'react';
import Cowsay from './Cowsay';

export default class Lelcowsay {
    static match() {
        return "lelcowsay";
    }
    static do(command) {
        return {message: 
            <div className='lelMessage'>
                {Cowsay.do(command).message} 
            </div>
        };
    }
    static help() {
        return <span>It is a cow that says things, nuff said   ...in rainbow color.</span>
    }
}