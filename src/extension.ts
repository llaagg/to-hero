import * as vscode from 'vscode';
import * as platform from './platformnfo';
import { PublicVariables } from './publicvariables';


export async function activate(context: vscode.ExtensionContext) {

	const pluginName = 'to-hero';
	let pv = new PublicVariables();

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName+ '.openSandbox', () => 
		{
			var result = vscode.window
				.showOpenDialog({canSelectFiles : false, canSelectFolders: true, canSelectMany:false})
				.then(async uri=>{
					if(uri)
					{
						await pv.setupWorkspace(pluginName, uri[0].fsPath);
					}
				});			
		})
	);

	pv.setupDotNetFlag(pluginName);	
	pv.setupExtensionCSharpFlag(pluginName);
}

// this method is called when your extension is deactivated
export function deactivate() {}
