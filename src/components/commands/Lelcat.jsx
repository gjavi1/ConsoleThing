import React from 'react';
import Cat from './Cat';

export default class Lelcat {
    static match() {
        return "lelcat";
    }

    static do(command) {
        return {message: <div className='lelMessage'> {Cat.do(command).message} </div>};
    }

    static help() {
        return <span>Reads a file in rainbow color.</span>
    }
}