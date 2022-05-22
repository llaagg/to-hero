import * as vscode from 'vscode';
import * as platform from './platformnfo';
import { ProjectsViewProvider } from './projectsviewprovider';
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

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ProjectsViewProvider.viewType, 
		new ProjectsViewProvider(context.extensionUri)		
	));

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + 'newProject', () => {
			
			vscode.window.showInformationMessage("ha");

		}));

	pv.setupDotNetFlag(pluginName);	
	pv.setupExtensionCSharpFlag(pluginName);
}

// this method is called when your extension is deactivated
export function deactivate() {}
