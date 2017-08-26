export default class Utils {
    static getFileSys() {
        return JSON.parse(localStorage.getItem("filesys"));
    }
    
    static generateInode() {
        let maxInode = localStorage.getItem("maxInode");
        
        return 
    }
}