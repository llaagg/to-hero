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
				.then(uri=>{
					if(uri)
					{
						pv.setupWorkspace(pluginName, uri[0].fsPath);
					}
				});
			
		})
	);

	pv.setupDotNetFlag(pluginName);	
}

// this method is called when your extension is deactivated
export function deactivate() {}
