import * as vscode from 'vscode';
import { PlatformNfo } from "./platformnfo";

export class PublicVariables
{
    p: PlatformNfo;
    
    constructor() {
        this.p = new PlatformNfo();
    }

    setupDotNetFlag(pluginName: String){
        vscode.commands.executeCommand('setContext', pluginName+'.checkHasDotNet', true);
    }   
}