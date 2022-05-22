(function() {
    const vscode = acquireVsCodeApi();

    console.log("starting");

    document.querySelectorAll('.folder').forEach(function(e) {
        e.addEventListener('click', (element) => {
            var at = element.target.attributes['folderName'].value;
            folderSelcted(at);
        });
    });

    function folderSelcted(folderName) {
        vscode.postMessage({ type: 'folderSelcted', value: folderName });
    }

}());