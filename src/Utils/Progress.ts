import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation, Progress } from 'vscode';

export interface MethodWithProgress{
    (progress: Progress<{ message?: string; increment?: number }>): void;
}

export function startWithProgress(description: string, method: MethodWithProgress) {
    vscode.commands.executeCommand('to-hero.startTask', description, method);
}

export function windowsWithProgress(description: string, taskToDo: MethodWithProgress) {
    
    console.log("Window");
    window.withProgress({
        location: ProgressLocation.Notification,
        title: description,
        cancellable: true
    }, async (progress, token) => {
        
        
        token.onCancellationRequested(() => {
            console.log("User canceled the long running operation");
        });

        let done = false;

        console.log("Task starting");
        await taskToDo(progress);
        console.log("Task stoped");

        
    });

    console.log("Window oof");

};