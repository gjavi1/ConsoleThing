export default class Utils {
    static getFileSys() {
        return JSON.parse(localStorage.getItem("filesys"));
    }
    
    static createDirectory(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        currentFileSys[dirName] = {};
        localStorage.setItem("filesys", JSON.stringify(currentFileSys));
    }

    static generateInode() {
        let maxInode = localStorage.getItem("maxInode");
        
        return 
    }
}