import * as execFile from 'child_process';

export class NetHelper{

    constructor(
		private readonly _workspaceFolder: string
	) { 
	}

    public newProject(projectName: string)
    {
        const options: execFile.ExecFileSyncOptions ={
            cwd: this._workspaceFolder
        };
        
        var fileRun = execFile.execFileSync(
            "dotnet"
            ,["new", "console", "--name", projectName]
            ,options
            );
        var rows = fileRun.toString().split("\n");
        rows.forEach(dotnetRev => {
            console.log(dotnetRev);
        });
    }
}