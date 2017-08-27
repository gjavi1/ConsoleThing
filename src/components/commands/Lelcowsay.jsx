import React from 'react';
import Echo from './Echo';
import Cowsay from './Cowsay';

export default class Lelcowsay {
    static match() {
        return "lelcowsay";
    }

    static do(command) {
        return {message: <span className='lelMessage'> {Cowsay.do(command).message} </span>};
    }
}