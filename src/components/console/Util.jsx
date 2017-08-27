export default class Utils {
    static createGuid() {
        function generate() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return generate() + generate() + '-' + generate() + '-' + generate() + '-' +
            generate() + '-' + generate() + generate() + generate();
    }

    static getFileSys() {
        return JSON.parse(localStorage.getItem("filesys"));
    }
    
    static createDirectory(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        currentFileSys[dirName] = {};
        localStorage.setItem("filesys", JSON.stringify(currentFileSys));
    }

    static removeDirectory(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let dirExist = currentFileSys[dirName] ? true : false;

        if (dirExist) {
            delete currentFileSys[dirName];
            localStorage.setItem("filesys", JSON.stringify(currentFileSys));
        } 

        return dirExist;
    }

    static createFile(fileName, path, data) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        
        if (!path) {
            currentFileSys[fileName] = this.createGuid();
        }

        localStorage.setItem("filesys", JSON.stringify(currentFileSys));
    }

    static getItemsInDir(path, data) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        
        let result = [];
        if (!path) {
            let preResult = Object.keys(currentFileSys);

            // console.log()
            preResult.forEach((val, key) => {
                result.push({
                    name: val,
                    type: typeof currentFileSys[val]
                });
            });
        }

        return result;
    }

    static getFirstWord(words) {
        let wordArray = words.split(" ");
        return wordArray[0];
    }

    static generateInode() {
        let maxInode = localStorage.getItem("maxInode");
        
        return 
    }
}