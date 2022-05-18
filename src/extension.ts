import * as vscode from 'vscode';
import * as platform from './platformnfo';

export function activate(context: vscode.ExtensionContext) {
	
	let initCommand = vscode.commands.registerCommand('to-hero.init', () => {
		vscode.window.showInformationMessage('Hello World from to-hero!');
	});

	let hasDotNetCommand = vscode.commands.registerCommand('to-hero.hasDotNet', () => {

		let greeter = new platform.PlatformNfo();
		if(!greeter.hasDotNet())
		{
			console.log('Dotnet not found');
		}
	
		vscode.window.showInformationMessage('Hello World from to-hero!');
	});

	
	context.subscriptions.push(initCommand);
	context.subscriptions.push(hasDotNetCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
