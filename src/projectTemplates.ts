import { Template } from "./Models/template";

export class ProjectTemplates {
    templates: { [name: string]: Template } = {};

    constructor(){
        this.templates.helloWorld = new Template();
        this.templates.helloWorld.description = "Text console application";
        this.templates.helloWorld.icon = "[C:\\] ";

        this.templates.plaUiWin = new Template();
        this.templates.plaUiWin.netType = "winforms";
        this.templates.plaUiWin.description = "Windows Application with Graphical User Interface";
        this.templates.plaUiWin.packages = ["pla.lib", "pla.win"];
        this.templates.plaUiWin.icon = "[GUI] ";

        // this.templates.plaUiGtk = new Template();
        // this.templates.plaUiGtk.description = "Application with Graphical User Interface";
        // this.templates.plaUiGtk.packages = ["pla.lib", "pla.gtk"];
        // this.templates.plaUiGtk.icon = "[GUI] ";

    } 

    public listKeys() : string[]
    {
        return Object.keys(this.templates);
    }

    get(key: string): Template {
        return this.templates[key];
	}
}
