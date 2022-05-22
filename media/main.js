(function() {
    const vscode = acquireVsCodeApi();

    console.log("starting");

    // document.querySelectorAll('.folder').forEach(function(e) {
    //     e.addEventListener('click', (element) => {
    //         console.log("folder!!!!", element);
    //         folderSelcted('a');
    //     });
    // });

    function folderSelcted(folderName) {
        vscode.postMessage({ type: 'folderSelcted', value: folderName });
    }

}());