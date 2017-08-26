import Utils from './Util';

export default class Mkdir {
    static match() {
        return "mkdir"; 
    }

    static do() {
       // find what directory you're in 
       console.log(Utils.getFileSys());
    }
}