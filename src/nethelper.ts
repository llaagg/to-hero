import * as vscode from 'vscode';
import * as execFile from 'child_process';
import * as fs from 'fs';
import path = require('path');
import { start } from 'repl';
import { Uri } from 'vscode';


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

        this.openProject(projectName);
    }


    public openProject(projectName: string){
        let newProjectFolder =  Uri.file(path.join(this._workspaceFolder , projectName));
        vscode.commands.executeCommand("vscode.openFolder", newProjectFolder);
    }
    
    public validateFolder(folder: string) : (string | undefined)
    {
        if(fs.existsSync(path.join(this._workspaceFolder , folder)))
        {
            return "Folder "+folder+" is taken.";
        }

        // ok
        return undefined;
    }

    public generateFolderName() : string
    {
        let startName = "HelloHero";
        let currentName = startName;
        let idx = 0;

        while(this.validateFolder(currentName) !== undefined)
        {
            idx++;
            currentName = startName + idx;
        }
        return currentName;
    }
}