import * as vscode from 'vscode';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBarItem.command = 'gitAutoCommit.showDashboard';
        this.statusBarItem.show();
    }

    update(): void {
        const config = vscode.workspace.getConfiguration('gitAutoCommit');
        const autoEnabled = config.get('enableAutoCommit', false);
        this.statusBarItem.text = autoEnabled ? '$(git-commit) Auto-Commit: ON' : '$(git-commit) Auto-Commit: OFF';
        this.statusBarItem.tooltip = 'Click to view commit dashboard';
    }

    dispose(): void {
        this.statusBarItem.dispose();
    }

    getStatusBarItem(): vscode.StatusBarItem {
        return this.statusBarItem;
    }
}
