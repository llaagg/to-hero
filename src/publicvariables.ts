import * as vscode from 'vscode';
import { PlatformNfo } from "./platformnfo";

export class PublicVariables
{
    p: PlatformNfo;
    
    constructor(private readonly _pluginName: string) {
        this.p = new PlatformNfo();
    }

    setupDotNetFlag(){
        let checkHasDotNet = this.p.hasDotNet();
        vscode.commands.executeCommand('setContext', this._pluginName+'.checkHasDotNet', checkHasDotNet);
    }   
        
	setupExtensionCSharpFlag() {
		var extension = vscode.extensions.getExtension("ms-dotnettools.csharp");
        let hasExtension = false;
        if(extension)
        {
            hasExtension = true;
        }

        vscode.commands.executeCommand('setContext', this._pluginName+'.checkHasCSharp', hasExtension);
	}

    async setupWorkspace(folderName:string) {
        await vscode.workspace
            .getConfiguration()
            .update(this._pluginName+ ".sandboxFolder", folderName, vscode.ConfigurationTarget.Global);
	}

    getWorkspace(): string
    {
        let settingsValue =  vscode.workspace
            .getConfiguration()
            .get<string>(this._pluginName + ".sandboxFolder");

        return settingsValue!;
    }
}