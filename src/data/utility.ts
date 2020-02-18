const fs = window.require('fs');

/**
 * Creates a directory if it doesn't exist.
 * @param path {string} Path of the directory to be created.
 */
export function createDirectory(path: string){
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

/**
 * Creates a file if it doesn't exist.
 * @param path
 */
export function createFile(path: string){
    if(!fs.existsSync(path)){
        fs.writeFileSync(path, "");
    }
}