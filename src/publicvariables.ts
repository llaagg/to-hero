import path = require('path');
import * as vscode from 'vscode';
import { pluginName } from './extension';
import { PlatformNfo } from "./platformnfo";

const fs = require("fs");

export class PublicVariables
{
	p: PlatformNfo = new PlatformNfo();
    
    constructor() {}

    setupDotNetFlag(){
        let checkHasDotNet = this.p.hasDotNet();
        vscode.commands.executeCommand('setContext', pluginName+'.checkHasDotNet', checkHasDotNet);
    }   
        
	setupExtensionCSharpFlag() {
		var extension = vscode.extensions.getExtension("ms-dotnettools.csharp");
        let hasExtension = false;
        if(extension)
        {
            hasExtension = true;
        }

        vscode.commands.executeCommand('setContext', pluginName+'.checkHasCSharp', hasExtension);
	}

    setupSandboxOK() {
		var ws = this.getWorkspace();
        var e = fs.existsSync(ws);
        vscode.commands.executeCommand('setContext', pluginName+'.checkSandboxOk', e);
	}
    
    setupProgress(inprogress:boolean) {
        vscode.commands.executeCommand('setContext', pluginName+'.inProgress', inprogress);
	}

    async setupWorkspace(folderName:string) {
        await vscode.workspace
            .getConfiguration()
            .update(pluginName+ ".sandboxFolder", folderName, vscode.ConfigurationTarget.Global);
	}

    getWorkspace(): string
    {
        let settingsValue =  vscode.workspace
            .getConfiguration()
            .get<string>(pluginName + ".sandboxFolder");

        return settingsValue!;
    }
}