import React from 'react';
import Fortune from './Fortune';

export default class Lelfortune {
    static match() {
        return "lelfortune";
    }

    static do(command) {
        return {message: <div className='lelMessage'> {Fortune.do(command).message} </div>};
    }

    static help() {
        return <span>Predetermines your fortune in rainbow color.</span>
    }
}