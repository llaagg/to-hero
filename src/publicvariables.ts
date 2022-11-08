import path = require('path');
import * as vscode from 'vscode';
import { pluginName } from './extension';
import { PlatformNfo } from "./platformnfo";

const fs = require("fs");


export class PublicVariables
{
	p: PlatformNfo = new PlatformNfo();
    
    flagInitializationInProgress = `flagInitializationInProgress`;

    constructor() {}

    setupDotNetFlag(){
        let checkHasDotNet = this.p.hasDotNet();
        this.setupFlag('checkHasDotNet', checkHasDotNet);
    }   
        
    setupFlag(name:string, flag: boolean){
        vscode.commands.executeCommand('setContext', pluginName+'.'+name, flag);
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