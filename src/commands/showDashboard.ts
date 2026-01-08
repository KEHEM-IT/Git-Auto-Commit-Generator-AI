import * as vscode from 'vscode';
import { CommitHistory } from '../types';
import { DashboardUI } from '../ui/dashboard';

export class ShowDashboardCommand {
    static execute(context: vscode.ExtensionContext): void {
        const panel = vscode.window.createWebviewPanel(
            'commitDashboard',
            'Git Commit History',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        const commitHistory: CommitHistory[] = context.globalState.get('commitHistory', []);
        panel.webview.html = DashboardUI.getDashboardHtml(commitHistory);

        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'refresh':
                        const updatedHistory: CommitHistory[] = context.globalState.get('commitHistory', []);
                        panel.webview.html = DashboardUI.getDashboardHtml(updatedHistory);
                        break;
                    case 'clearHistory':
                        await context.globalState.update('commitHistory', []);
                        panel.webview.html = DashboardUI.getDashboardHtml([]);
                        break;
                    case 'configureAI':
                        await vscode.commands.executeCommand('gitAutoCommit.configureAI');
                        const newHistory: CommitHistory[] = context.globalState.get('commitHistory', []);
                        panel.webview.html = DashboardUI.getDashboardHtml(newHistory);
                        break;
                    case 'openSettings':
                        vscode.commands.executeCommand('workbench.action.openSettings', 'gitAutoCommit');
                        break;
                }
            }
        );
    }
}
