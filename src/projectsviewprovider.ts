import * as vscode from 'vscode';

export class ProjectsViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
	public static readonly viewType = 'to-hero.projectsView';

    constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView, 
        context: vscode.WebviewViewResolveContext<unknown>, 
        token: vscode.CancellationToken): void | Thenable<void> 
    {

        this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'colorSelected':
					{
						vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
						break;
					}
			}
		});
    }


    private _getHtmlForWebview(webview: vscode.Webview) {
		const nonce = this.getNonce();

		const htmlHead = this.getHeader(webview, nonce);
		const htmlFoot = this.getFooter(webview, nonce);

		// list all folders
		// enable watch adnd refresh

		return htmlHead +
`	
				
<div class="flex-container">
<div>🗀<br/>asd</div>
<div>🗀<br/>asd</div>
<div>🗀<br/>asd</div>
</div>


<button class="add-color-button">Heading nowhere</button>
`
			+ htmlFoot;
	}

	getFile(webview: vscode.Webview, fName: string){
		return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', fName));
	}

	getFooter(webview: vscode.Webview, nonce: String):string {
		const scriptUri = this.getFile(webview, 'main.js');

		return `			
			<script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>`;
	}

	getHeader(webview: vscode.Webview, nonce: String):string {

		// Do the same for the stylesheet.
		const styleResetUri = this.getFile(webview, "reset.css");
		const styleVSCodeUri = this.getFile(webview, "vscode.css");
		const styleMainUri = this.getFile(webview, "main.css");

		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
			-->
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="${styleResetUri}" rel="stylesheet">
			<link href="${styleVSCodeUri}" rel="stylesheet">
			<link href="${styleMainUri}" rel="stylesheet">
			
			<title>Cat Colors</title>
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
