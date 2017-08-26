import React from 'react';
import Echo from './Echo';

export default class Lelecho {
    static match() {
        return "lelecho";
    }

    static do(command) {
        return {message: <span className='lelMessage'> {Echo.do(command).message} </span>};
    }
}