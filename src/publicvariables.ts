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
    
    async setupWorkspace(pluginName: string, folderName:string) {
        await vscode.workspace
            .getConfiguration()
            .update(pluginName+ ".sandboxFolder", folderName, vscode.ConfigurationTarget.Global);
	}

	setupExtensionCSharpFlag(pluginName: string) {
		var extension = vscode.extensions.getExtension("ms-dotnettools.csharp");
        let hasExtension = false;
        if(extension)
        {
            hasExtension = true;
        }

        vscode.commands.executeCommand('setContext', pluginName+'.checkHasCSharp', hasExtension);
	}

    setupCompleteFlag(pluginName: string, context: vscode.ExtensionContext) {
		var d = context.environmentVariableCollection.get(pluginName + ".checkHasDotNet")?.value;

	}
   
}