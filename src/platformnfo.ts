const cp = require('child_process');

class PlatformNfo {
   
    constructor() {
      
    }

    hasDotNet(){
        cp.exec('pwd', (err: string, stdout: string, stderr: string) => {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (err) {
                console.log('error: ' + err);
            }
        });
    }
  }