(function() {
    const vscode = acquireVsCodeApi();

    console.log("starting");

    document.querySelectorAll('.folder').forEach(function(e) {
        e.addEventListener('click', (element) => {
            var at = element.target.attributes['folderName'].value;
            folderSelcted(at);
        });
    });

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

    function folderSelcted(folderName) {
        vscode.postMessage({ type: 'folderSelcted', value: folderName });
    }

    function callAction(actionName) {
        vscode.postMessage({ type: actionName });
    }

}());