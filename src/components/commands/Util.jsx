export default class Utils {
    static getFileSys() {
        return JSON.parse(localStorage.getItem("filesys"));
    }
}