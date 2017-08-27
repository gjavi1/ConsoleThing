export default class Utils {

    static currentDir = "/";

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
    
    static checkDirExist(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));        
        let dirs = this.currentDir.split("/");

        dirs.forEach( val => {
            if (val) {
                currentFileSys = currentFileSys[val];
            }
        });

        if (this.currentDir === "/" && dirName === "/") {
            return true;
        }

        return currentFileSys[dirName] ? true : false;
    }

    static navigateDir(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let oldPath = this.currentDir;
        let success = true;

        if (dirName === "/" ) {
            this.currentDir = "/";
        } else if (dirName === ".." && this.currentDir !== "/") {
            console.log(this.currentDir);
            let dirs =  this.currentDir.split("/");
            dirs.pop();
            dirs.pop();
            this.currentDir = dirs.join("/") + "/";
        } else if (dirName === ".") {
            // do nothing
        } else {
            // TODO
            // catch for .. and .
            if (this.checkDirExist(dirName)) {
                this.currentDir = `${this.currentDir}${dirName}/`;
            } else {
                success = false;
            }
        }
        
        return success;
    }

    static createDirectory(dirName) {
        
        if (dirName === "/") {
            return;
        }

        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let dirs = this.currentDir.split("/");
        let pathSys;     

        dirs.forEach( val => {
            if (typeof pathSys === "undefined") {
                pathSys = currentFileSys;
            }

            if (val) {
                pathSys = pathSys[val];
            }
        });

        if (typeof pathSys === "undefined") {
            currentFileSys[dirName] = {};
        } else {
            pathSys[dirName] = {};
        }
    
        localStorage.setItem("filesys", JSON.stringify(currentFileSys));
    }

    static removeDirectory(dirName) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let dirs = this.currentDir.split("/");
        let pathSys;     

        dirs.forEach( val => {
            if (typeof pathSys === "undefined") {
                pathSys = currentFileSys;
            }

            if (val) {
                pathSys = pathSys[val];
            }
        });

        let dirExist;

        if (typeof pathSys === "undefined") {
            dirExist = currentFileSys[dirName] ? true : false;
        } else {
            dirExist = pathSys[dirName] ? true : false;
        }

        if (dirExist) {
            if (typeof pathSys === "undefined") {
                delete currentFileSys[dirName];
            } else {
                delete pathSys[dirName];
            }
            localStorage.setItem("filesys", JSON.stringify(currentFileSys));
        } 

        return dirExist;
    }

    static createFile(fileName, path, data) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let dirs = this.currentDir.split("/");
        let pathSys;     

        dirs.forEach( val => {
            if (typeof pathSys === "undefined") {
                pathSys = currentFileSys;
            }

            if (val) {
                pathSys = pathSys[val];
            }
        });

        if (typeof pathSys === "undefined") {
            currentFileSys[fileName] = this.createGuid();
        } else {
            pathSys[fileName] = this.createGuid();
        }

        localStorage.setItem("filesys", JSON.stringify(currentFileSys));
    }

    static getItemsInDir(path, data) {
        let currentFileSys =  JSON.parse(localStorage.getItem("filesys"));
        let dirs = this.currentDir.split("/");

        console.log(dirs);
        dirs.forEach( val => {
            if (val) {
                currentFileSys = currentFileSys[val];
            }
        });

        let result = [];
        if (!path) {
            let preResult = Object.keys(currentFileSys);

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