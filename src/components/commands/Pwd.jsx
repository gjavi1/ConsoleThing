import Utils from '../console/Util';

export default class Pwd {
    static match() {
        return "pwd";
    }

    static do(command, env) {
        return {message: env.pwd}
    }
}