import * as vscode from 'vscode';
import { InputBoxOptions } from "vscode";
import { init, localize } from "vscode-nls-i18n";
import { NetHelper } from '../nethelper';
import { MethodWithProgress, startWithProgress } from '../Utils/Progress';

export function newProject(
    templateName: any, 
    nh: NetHelper) {
    
    const options: InputBoxOptions={
        title: localize("to-hero.newProjectName"),
        value: nh.generateFolderName(),
        validateInput: (a: string)=>{
            return nh.validateFolder(a);
        },
        prompt: localize("to-hero.pleaseProvideNewProjectName")
    };			

    // let's ask user
    vscode.window.showInputBox(options).then(async e=>{
        await startWithProgress("Create new project", (progressIndicator)=>{
            nh.newProject(e!, templateName, progressIndicator);
        });
    });
    
}

