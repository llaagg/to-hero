(function() {
    const vscode = acquireVsCodeApi();

    document.querySelectorAll('.folder').forEach(function(e) {
        e.addEventListener('click', (element) => {
            var at = element.target.attributes['folderName'].value;
            callAction('folderSelcted', at);
        });
    });

    document.querySelectorAll('.newProjectButton').forEach(function(e) {
        e.addEventListener('click', (element) => {
            var at = element.target.attributes['projectName'].value;
            callAction('newProject', at);
        });
    });

    document.querySelector('#open-sandbox')
        .addEventListener('click', () => {
            callAction('openSandbox');
        });

    function callAction(actionName, args) {

        vscode.postMessage({ type: actionName, value: args });
    }

}());