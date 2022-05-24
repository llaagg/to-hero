import * as vscode from 'vscode';
import { InputBoxOptions } from 'vscode';
import { NetHelper } from './nethelper';
import * as platform from './platformnfo';
import { ProjectsViewProvider } from './projectsviewprovider';
import { PublicVariables } from './publicvariables';

export const pluginName:string = 'to-hero';

export async function activate(context: vscode.ExtensionContext) {

	let pv = new PublicVariables();
	let nh = new NetHelper(pv.getWorkspace(), context.extensionPath);


	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName+ '.openSandbox', () => 
		{
			vscode.window
				.showOpenDialog({canSelectFiles : false, canSelectFolders: true, canSelectMany:false})
				.then(async uri=>{
					if(uri)
					{
						await pv.setupWorkspace(uri[0].fsPath);
						pv.setupSandboxOK();
					}
				});			
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName+ '.openProject', (projectName) => 
		{
			nh.openProject(projectName);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName+ '.refreshFlags', () => 
		{
			pv.setupDotNetFlag();	
			pv.setupExtensionCSharpFlag();
			pv.setupSandboxOK();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.newProject', () => {
			const options: InputBoxOptions={
				title: "New project name",
				value: nh.generateFolderName(),
				validateInput: (a: string)=>{
					return nh.validateFolder(a);
				},
				prompt: "Please provide a name for your new program"
			};			

			vscode.window.showInputBox(options).then(e=>{
				nh.newProject(e!);
			});
			
		}));

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ProjectsViewProvider.viewType, 
		new ProjectsViewProvider(context.extensionUri)		
	));
	
	
	vscode.commands.executeCommand(pluginName+".refreshFlags");
}

// this method is called when your extension is deactivated
export function deactivate() {};
