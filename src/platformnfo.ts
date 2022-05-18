import util from 'util';

const cp = require('child_process');
const exec = util.promisify(cp.exec);

export class PlatformNfo {
   
    constructor() {
      
    }

    hasDotNet() : boolean{
        let ok = false;
        const result = await exec(`my command`);
        
        cp.exec('dotnet --list-sdks', (err: string, stdout: string, stderr: string) => {
            if (err) {
                ok = false;
            }

            ok=true;
        });

        return ok;
    }
  }