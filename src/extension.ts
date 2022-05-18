import * as vscode from 'vscode';
import * as platform from './platformnfo';
import { PublicVariables } from './publicvariables';


export function activate(context: vscode.ExtensionContext) {
	
	const pluginName = 'to-hero';

	let initCommand = vscode.commands.registerCommand(pluginName+ '.init', () => {
		let pv = new PublicVariables();
		pv.setupDotNetFlag(pluginName);
	});

	let hasDotNetCommand = vscode.commands.registerCommand(pluginName+ '.hasDotNet', () => {
		let platfromDetails = new platform.PlatformNfo();
	});
	
	context.subscriptions.push(initCommand);
	context.subscriptions.push(hasDotNetCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
