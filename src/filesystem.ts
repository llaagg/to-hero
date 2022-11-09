import fs = require("fs");
import path = require("path");


interface FileWorker {
    (fileName: string): void;
}

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
export var copyRecursiveSync = (src: string, dest: string, worker: FileWorker) => {
    var exists = fs.existsSync(src);
    if(exists)
    {
        var stats = fs.statSync(src);
        var isDirectory = exists && stats.isDirectory();
        
        if (isDirectory) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(function (childItemName: string) {
                copyRecursiveSync(path.join(src, childItemName),
                    path.join(dest, childItemName),
                    worker);
            });
        } else {
            fs.copyFileSync(src, dest);
            if (worker) {
                worker(dest);
            }
        }
    }
};

export function replaceInFile(fileName: string, toFind: string, toReplace: string) {
    const data = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'});
    const result = data.replace(toFind, toReplace);
    fs.writeFileSync(fileName, result, 'utf8');    
}
