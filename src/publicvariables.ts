import * as vscode from 'vscode';
import { PlatformNfo } from "./platformnfo";

export class PublicVariables
{

    p: PlatformNfo;
    
    constructor() {
        this.p = new PlatformNfo();
    }

    setupDotNetFlag(pluginName: String){
        let checkHasDotNet = this.p.hasDotNet();
        vscode.commands.executeCommand('setContext', pluginName+'.checkHasDotNet', checkHasDotNet);
    }   
    
    setupWorkspace(pluginName: string, folderName:string) {
        vscode.commands.executeCommand('setContext', pluginName+'.checkSandboxFolder', folderName);
	}

}