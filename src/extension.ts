import * as vscode from 'vscode';
import { InputBoxOptions } from 'vscode';
import { NetHelper } from './nethelper';
import * as platform from './platformnfo';
import { ProjectsViewProvider } from './projectsviewprovider';
import { PublicVariables } from './publicvariables';


export async function activate(context: vscode.ExtensionContext) {

	const pluginName = 'to-hero';
	let pv = new PublicVariables(pluginName);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName+ '.openSandbox', () => 
		{
			vscode.window
				.showOpenDialog({canSelectFiles : false, canSelectFolders: true, canSelectMany:false})
				.then(async uri=>{
					if(uri)
					{
						await pv.setupWorkspace(uri[0].fsPath);
					}
				});			
		})
	);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ProjectsViewProvider.viewType, 
		new ProjectsViewProvider(context.extensionUri, pluginName)		
	));

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.newProject', () => {
			var nh = new NetHelper(pv.getWorkspace());

			const options: InputBoxOptions={
				title: "New project name",
				value: nh.generateFolderName(),
				validateInput: (a: string)=>{
					var nh = new NetHelper(pv.getWorkspace());
					return nh.validateFolder(a);
				},
				prompt: "Please provide a name for a new program"
			};			

			vscode.window.showInputBox(options).then(e=>{
				nh.newProject(e!);
			});
			
		}));

	pv.setupDotNetFlag();	
	pv.setupExtensionCSharpFlag();
}

// this method is called when your extension is deactivated
export function deactivate() {}
