import * as execFile from 'child_process';

export class PlatformNfo {
   
    constructor() {
      
    }

    hasDotNet() : boolean{
        let ok = false;
        var fileRun = execFile.execFileSync("dotnet", ["--list-sdks"]);
        var rows = fileRun.toString().split("\n");
        
        rows.forEach(dotnetRev => {
            ok=true;
            console.log(dotnetRev);
        });
        
        return ok;
    }

    public static openFolder(folder: string): void{
        execFile.execFileSync("explorer", [folder]);
    }
  }