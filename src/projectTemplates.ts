import { Template } from "./Models/template";

export class ProjectTemplates {
    templates: { [name: string]: Template } = {};

    constructor(){
        this.templates.helloWorld = new Template();
        this.templates.helloWorld.description = "Text console application";
        this.templates.helloWorld.icon = "[abc] ";

        this.templates.plaUI = new Template();
        this.templates.plaUI.description = "Application with Graphical User Interface";
        this.templates.plaUI.packages = ["pla.lib", "pla.gtk"];
        this.templates.plaUI.icon = "[GUI] ";
    } 

    public listKeys() : string[]
    {
        return Object.keys(this.templates);
    }

    get(key: string): Template {
        return this.templates[key];
	}
}
