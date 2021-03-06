import * as vscode from 'vscode';
import { localize } from 'vscode-nls-i18n';
import { pluginName } from './extension';
import { PlatformNfo } from './platformnfo';
import { ProjectsManager } from './projectsmanager';
import { PublicVariables } from './publicvariables';

export class ProjectsViewProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;
	public static readonly viewType = 'to-hero.projectsView';
	private _variables: PublicVariables;
	private _projectsManager: ProjectsManager;

    constructor(
		private readonly _extensionUri: vscode.Uri
	) { 
		this._variables = new PublicVariables();
		this._projectsManager = new ProjectsManager(this._variables.getWorkspace());
	}

    resolveWebviewView(
        webviewView: vscode.WebviewView, 
        context: vscode.WebviewViewResolveContext<unknown>, 
        token: vscode.CancellationToken): void | Thenable<void> 
    {
        this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'folderSelcted':
					{
						vscode.commands.executeCommand(pluginName+".openProject", data.value);
					}
					break;
				case 'newProject':
					{
						vscode.commands.executeCommand(pluginName+".newProject", data.value);
					}
					break;
				case 'openSandbox':
					{
						PlatformNfo.openFolder(this._variables.getWorkspace());
					}
					break;
			}
		});
    }

	public requestRefresh() {
		if (this._view) {
			this._projectsManager = new ProjectsManager(this._variables.getWorkspace());
			this._view.webview.html = this._getHtmlForWebview(this._view.webview);
		}
	}

    private _getHtmlForWebview(webview: vscode.Webview) {
		const nonce = this.getNonce();

		let html = ``;

		html += this.getHeader(webview, nonce);
		html += this.renderFolderName();
		html += '<hr/>';
		html += this.renderFolder();
		html += '<hr/>';
		html += this.renderToolBar();
		html += this.getFooter(webview, nonce);

		return html;
	}

	private renderFolderName() {
		return '<span id="open-sandbox">???? '+ this._variables.getWorkspace() +'</span>';
	}
	
	private renderToolBar() {
		var html:string = '';
		html += `<div class="flex-container">`;
		html += `<div class="item"><span class="new-project-button" projectName="helloWorld">[abc] ` + localize("to-hero.newProject")  + `</span></div>`;
		html += `</div>`;
		return html;
	}

	private renderFolder() {
		var html:string ='';
		var files = this._projectsManager.getFolders();

		if (files.length === 0) {
			html += `<span>There is nothing here. Start new project to become a Hero. (click the fish)</span>`;
		} else {
			var folderList = ``;
			for (var item of files) {
				folderList = folderList + this.getIcon(item);
			}

			html += `<div class="flex-container">`;
			html += folderList;
			html += `</div>`;
		}
		return html;
	}

	getIcon(label: String) : string
	{
		return `<div class="item"><span class="folder" folderName="`+label+`" >???? `+label+`</span></div>`;
	}

	getFileReference(webview: vscode.Webview, fName: string){
		return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', fName));
	}

	getFooter(webview: vscode.Webview, nonce: String):string {
		const scriptUri = this.getFileReference(webview, 'main.js');

		return `			
			<script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>`;
	}

	getHeader(webview: vscode.Webview, nonce: string):string {

		// Do the same for the stylesheet.
		const styleResetUri = this.getFileReference(webview, "reset.css");
		const styleVSCodeUri = this.getFileReference(webview, "vscode.css");
		const styleMainUri = this.getFileReference(webview, "main.css");

		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">

			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="${styleResetUri}" rel="stylesheet">
			<link href="${styleVSCodeUri}" rel="stylesheet">
			<link href="${styleMainUri}" rel="stylesheet">
			
			<title>To hero sandbox</title>
		</head>
		<body>`;
	}

    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

}
