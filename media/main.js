(function() {
    const vscode = acquireVsCodeApi();

    document.querySelectorAll('.folder').forEach(function(e) {
        e.addEventListener('click', (element) => {
            var at = element.target.attributes['folderName'].value;
            folderSelcted(at);
        });
    });

    document.querySelector('#new-project-button')
        .addEventListener('click', () => {
            callAction('newProject');
        });

    document.querySelector('#open-sandbox')
        .addEventListener('click', () => {
            callAction('openSandbox');
        });

    function folderSelcted(folderName) {
        vscode.postMessage({ type: 'folderSelcted', value: folderName });
    }

    function callAction(actionName) {
        vscode.postMessage({ type: actionName });
    }

}());