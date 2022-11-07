import { Template } from "./Models/template";

export class ProjectTemplates {
    templates: { [name: string]: Template } = {};

    constructor(){
        this.templates.helloWorld = new Template();
        this.templates.helloWorld.description = "Simple console application";
        this.templates.helloWorld.icon = "[abc] ";

        this.templates.plaUI = new Template();
        this.templates.plaUI.description = "Simple windows application with Skia component";
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




