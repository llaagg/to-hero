import * as vscode from 'vscode';
import { NetHelper } from './nethelper';
import { ProjectsViewProvider } from './projectsviewprovider';
import { PublicVariables } from './publicvariables';
import { init } from "vscode-nls-i18n";
import { ProjectTemplates } from './projectTemplates';
import { newProject } from './Commands/newProject';
import { windowsWithProgress } from './Utils/Progress';
import path = require('path');

export const pluginName:string = 'to-hero';

export async function activate(context: vscode.ExtensionContext) {
	const pv = new PublicVariables();
	const workingFolder = pv.getWorkspace();

	pv.setupFlag(pv.flagInitializationInProgress, true);

	// initilize i18n
	init(context.extensionPath);

	addSubscriptions(context, pv, workingFolder);

	vscode.commands.executeCommand(pluginName+".refreshFlags");

	pv.setupFlag(pv.flagInitializationInProgress, false);

	//  auto open program.cs for all projects in our sandbox
	if( workingFolder &&
		vscode.workspace.workspaceFolders &&
		vscode.workspace.workspaceFolders.length === 1)
	{
		const firstFoler = vscode.workspace.workspaceFolders[0];
		const workFolderUri = vscode.Uri.file(workingFolder);
		if( firstFoler.uri.path.indexOf(workFolderUri.path) >= 0)
		{
			let filePath =  vscode.Uri.file(path.join(firstFoler.uri.path, "Program.cs"));
			await  vscode.commands.executeCommand("vscode.open",  filePath);
		}	
	}
}

function addSubscriptions(context: vscode.ExtensionContext, pv: PublicVariables, workingFolder: string) {
	
	const nh = new NetHelper(workingFolder, context.extensionPath, new ProjectTemplates());
	const projectsView = new ProjectsViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.openSandbox', () => {
			vscode.window
				.showOpenDialog({ canSelectFiles: false, canSelectFolders: true, canSelectMany: false })
				.then(async (uri) => {
					if (uri) {
						await pv.setupWorkspace(uri[0].fsPath);
						pv.setupSandboxOK();
						projectsView.requestRefresh();
					}
				});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.openProject', async (projectName) => {
			await nh.openProject(projectName);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.refreshFlags', async () => {
			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
				},
				async (progres) => {
					progres.report({"message": "Dotnet"});
					pv.setupDotNetFlag();
					progres.report({"message": "C# extension"});
					pv.setupExtensionCSharpFlag();
					progres.report({"message": "Sandbox"});
					pv.setupSandboxOK();
				});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.newProject', (templateName) => {
			newProject(templateName, nh);
		}));

	context.subscriptions.push(
		vscode.window
			.registerWebviewViewProvider(ProjectsViewProvider.viewType, projectsView));

	context.subscriptions.push(
		vscode.commands.registerCommand(pluginName + '.startTask', (description, taskToDo) => {
			windowsWithProgress(description, taskToDo);
		})
	);


}

// this method is called when your extension is deactivated
export function deactivate() {};
