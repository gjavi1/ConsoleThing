import Utils from '../console/Util';
import React from 'react';

export default class Pwd {
    static match() {
        return "pwd";
    }

    static do(command, env) {
        return {message: env.pwd}
    }

    static help() {
        return <span>Does what it says on the tin</span>
    }
}