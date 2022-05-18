// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "to-hero" is now active!');
	console.warn('Congratulations, your extension "to-hero" is now active!');
	console.error('Congratulations, your extension "to-hero" is now active!');

	let greeter = new PlatformNfo();

	let disposable = vscode.commands.registerCommand('to-hero.init', () => {
		vscode.window.showInformationMessage('Hello World from to-hero!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
