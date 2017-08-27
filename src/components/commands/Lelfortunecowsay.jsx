import React from 'react';
import Fortune from './Fortune';
import Cowsay from './Cowsay';
import Lelecho from './Lelecho';

export default class Lelfortunecowsay {
    static match() {
        return "lelfortunecowsay";
    }

    static do(command) {
        return {message: <div className='lelMessage'> {Cowsay.do('cowsay ' + Fortune.do(command).message).message} </div>};
    }

    static help() {
        return <span>It is a cow that predetermines your future, nuff said   ...in rainbow color.</span>
    }
}