import * as vscode from 'vscode';
import { InputBoxOptions } from 'vscode';
import { NetHelper } from './nethelper';
import { ProjectsViewProvider } from './projectsviewprovider';
import { PublicVariables } from './publicvariables';
import { init, localize } from "vscode-nls-i18n";

export const pluginName:string = 'to-hero';

export async function activate(context: vscode.ExtensionContext) {
	init(context.extensionPath);

	const pv = new PublicVariables();
	const nh = new NetHelper(pv.getWorkspace(), context.extensionPath);
	const projectsView = new ProjectsViewProvider(context.extensionUri);

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
						projectsView.requestRefresh();
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
		vscode.commands.registerCommand(pluginName+ '.refreshFlags', async () => 
		{
			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
				},
				async (progres)=>{
					pv.setupDotNetFlag();	
					pv.setupExtensionCSharpFlag();
					pv.setupSandboxOK();
			} );
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.newProject', (templateName) => {
			const options: InputBoxOptions={
				title: localize("to-hero.newProjectName"),
				value: nh.generateFolderName(),
				validateInput: (a: string)=>{
					return nh.validateFolder(a);
				},
				prompt: localize("to-hero.pleaseProvideNewProjectName")
			};			

			vscode.window.showInputBox(options).then(e=>{
				nh.newProject(e!, templateName);
			});
			
		}));

	context.subscriptions.push(
		vscode.window
			.registerWebviewViewProvider(ProjectsViewProvider.viewType, projectsView));
	
	vscode.commands.executeCommand(pluginName+".refreshFlags");
}

// this method is called when your extension is deactivated
export function deactivate() {};
