import path = require('path');
import * as vscode from 'vscode';
import { pluginName } from './extension';
import { PlatformNfo } from "./platformnfo";

const fs = require("fs");


export class PublicVariables
{
	p: PlatformNfo = new PlatformNfo();
    
    flagCheckHasDotNet:string = "checkHasDotNet";
    flagCheckHasCSharp:string = "checkHasCSharp";
    flagCheckSandboxOk:string = "checkSandboxOk";
	flagCheckAllOk:string = "allOk";
    
    flagInitializationInProgress = `flagInitializationInProgress`;

    constructor() {}

    setupFlag(name:string, flag: boolean){
        vscode.commands.executeCommand('setContext', pluginName+'.'+name, flag);
    }

    setupDotNetFlag(){
        let checkHasDotNet = this.p.hasDotNet();
        this.setupFlag(this.flagCheckHasDotNet, checkHasDotNet);
    }   
    
	setupExtensionCSharpFlag() {
		var extension = vscode.extensions.getExtension("ms-dotnettools.csharp");
        let hasExtension = false;
        if(extension)
        {
            hasExtension = true;
        }

        this.setupFlag(this.flagCheckHasCSharp, hasExtension);
	}

    setupSandboxOK() {
		var ws = this.getWorkspace();
        var e = fs.existsSync(ws);
        this.setupFlag(this.flagCheckSandboxOk, e);
	}
   
    async setupWorkspace(folderName:string) {
        await vscode.workspace
            .getConfiguration()
            .update(pluginName+ ".sandboxFolder", folderName, vscode.ConfigurationTarget.Global);
	}

    /// returns user settings with sandbox
    getWorkspace(): string
    {
        let settingsValue =  vscode.workspace
            .getConfiguration()
            .get<string>(pluginName + ".sandboxFolder");

        return settingsValue!;
    }
}