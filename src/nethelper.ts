import * as vscode from 'vscode';
import * as execFile from 'child_process';

const util = require('util');
const execa = util.promisify(execFile.exec);

import * as fs from 'fs';
import path = require('path');
import { Uri } from 'vscode';
import { copyRecursiveSync, replaceInFile } from './filesystem';
import { ProjectTemplates } from './projectTemplates';
import { resolve } from 'path';

export class NetHelper{

    constructor(
		private readonly _workspaceFolder: string,
        private readonly _extensionPath:string,
        private readonly _templates: ProjectTemplates
	) { 
	}

    public async runCommand(command: string, args: string[], progress: 
        vscode.Progress<{ message?: string; increment?: number }>): Promise<void> {

        const opt: execFile.ExecOptions={
            cwd: this._workspaceFolder,
        };
        
        var cmd = command + ' '+ args.join(' ');
        
        progress.report({message: cmd});

        const { stdout, stderr } = await execa(cmd, opt);

        
        this.showProgressFromArray(stdout, progress);
        
        if(stderr)
        {
            this.showProgressFromArray(stderr, progress);
        }

    }
    
    showProgressFromArray(lines:string, progress: vscode.Progress<{ message?: string; increment?: number }>)
    {

        lines.split('\n').forEach(element => {
            if(element!="\r")
            {
                this.showprogress(element, progress);
            }
        });
    }

    showprogress(line:string, progress: vscode.Progress<{ message?: string; increment?: number }>)
    {
        console.log( line);
        progress.report({message: line });

    }

    public async newProject(projectName: string, templateName: string, progress: 
        vscode.Progress<{ message?: string; increment?: number }>)
    {
        this.showprogress( "Loading template", progress);
        var template = this._templates.get(templateName);

        this.showprogress(  "Creating new dotnet project: "+template.netType, progress);

        await this.runCommand("dotnet", ["new", template.netType, "--name", projectName], progress);

        this.showprogress(  "Coping static files ",progress);
        this.publishTemplateFiles(templateName, projectName);
        
        if(template.packages)
        {
            for await (const e of template.packages) {
                this.showprogress(   "Installing: " + e , progress);
                await this.runCommand("dotnet", ["add", projectName, "package", e], progress);
            }
        }

        this.showprogress(    "Loading project: " + projectName, progress);
        this.openProject(projectName);

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