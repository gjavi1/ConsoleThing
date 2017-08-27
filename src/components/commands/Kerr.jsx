import Utils from '../console/Util';
import React from 'react';

export default class Kerr {
    static match() {
        return "kerr";
    }

    static do(command, env) {
        window.open("https://jack775544.github.io/ConsoleThing/",'name','height=200,width=150');
        
        return {message: ""}
    }

    static help(){
        return <span>It does a thing</span>;
    }
}