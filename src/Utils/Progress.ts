import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands, ProgressLocation, Progress } from 'vscode';

export interface MethodWithProgress{
    (progress: Progress<{ message?: string; increment?: number }>): void;
}

export function startWithProgress(description: string, method: MethodWithProgress) {
    vscode.commands.executeCommand('to-hero.startTask', description, method);
}

export async function windowsWithProgress(description: string, taskToDo: MethodWithProgress) {

    await window.withProgress({
        location: ProgressLocation.Notification,
        title: description,
        cancellable: true
    }, async (progress, token) => {
        progress.report({message:"Start", increment: 0 });

        token.onCancellationRequested(() => {
            console.log("User canceled the long running operation");
        });

        (async () => {
            taskToDo(progress);
        })();


        this progress doesnt work wtf
        taskToDo(progress);

        const p = new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });

        return p;
    });
};