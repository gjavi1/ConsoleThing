import React from 'react';
import Fortune from './Fortune';
import Cowsay from './Cowsay';

export default class Fortunecowsay {
    static match() {
        return "fortunecowsay";
    }

    static do(command) {
        return {message: <div> {Cowsay.do('cowsay ' + Fortune.do(command).message).message} </div>};
    }

    static help() {
        return <span>It is a cow that predetermines your future, nuff said.</span>
    }
}