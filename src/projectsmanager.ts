const fs = require("fs");

export class ProjectsManager{
    constructor(
		private readonly _sandboxFolder: string,
	) { 

    }

    getFolders() : string[]{
        var folders = new Array();

        var files = fs.readdirSync(this._sandboxFolder);
        files.forEach(function(e: any){
            folders.push(e);
        });

        return folders;
    }
}