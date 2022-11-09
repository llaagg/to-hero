import * as vscode from 'vscode';
import * as execFile from 'child_process';
import * as fs from 'fs';
import path = require('path');
import { Uri } from 'vscode';
import { copyRecursiveSync, replaceInFile } from './filesystem';
import { ProjectTemplates } from './projectTemplates';

export class NetHelper{

    constructor(
		private readonly _workspaceFolder: string,
        private readonly _extensionPath:string,
        private readonly _templates: ProjectTemplates
	) { 
	}

    public runCommand(command: string, args: string[], progress: 
        vscode.Progress<{ message?: string; increment?: number }>): void {
        const options: execFile.ExecFileSyncOptions ={
            cwd: this._workspaceFolder
        };

        var fileRun = execFile.execFileSync(
            command,
            args,
            options
        );
                
        var rows = fileRun.toString().split("\n");
        console.log(rows);
        if(progress)
        {
            rows.forEach(element => {
                progress.report({message: element});
            });
        }
    }
    
    public newProject(projectName: string, templateName: string, progress: 
        vscode.Progress<{ message?: string; increment?: number }>)
    {
        progress.report({message: "Loading template"});
        var template = this._templates.get(templateName);

        progress.report({message: "Creating new dotnet project: "+template.netType});
        this.runCommand("dotnet", ["new", template.netType, "--name", projectName], progress);

        progress.report({message: "Copying template files"});
        this.publishTemplateFiles(templateName, projectName);
        
        template.packages?.forEach(e=>{
            progress.report({message: "Installing: "+e});
            this.runCommand("dotnet",["add", projectName , "package", e], progress);            
        });

        progress.report({message: "Loading project: " + projectName});
        //this.openProject(projectName);        
    }

    publishTemplateFiles(templateName: string, projectName: string) {
        var templatePath = path.join(this._extensionPath ,'resources','templates',templateName);
        var projectPath = path.join(this._workspaceFolder, projectName);

        copyRecursiveSync(templatePath, projectPath, (fileName)=>{
            replaceInFile(fileName, "NEW-PROJECT-NAME", projectName);
        });
    }

    public openProject(projectName: string): void{
        let folderpath = path.join(this._workspaceFolder , projectName);
        let newProjectFolder =  Uri.file(folderpath);
        vscode.commands
            .executeCommand("vscode.openFolder", newProjectFolder);
    }
    
    public validateFolder(folder: string) : (string | undefined)
    {
        if(fs.existsSync(path.join(this._workspaceFolder , folder)))
        {
            return "Folder "+folder+" is taken.";
        }

        // if result is undefined then validation is ok
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