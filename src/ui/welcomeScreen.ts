import * as vscode from 'vscode';

export class WelcomeScreen {
    static async show(context: vscode.ExtensionContext): Promise<void> {
        const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
        if (hasShownWelcome) return;

        const choice = await vscode.window.showInformationMessage(
            '🚀 Welcome to Git Auto Commit! This extension can automatically commit your changes at regular intervals. Would you like to enable auto-commit?',
            'Enable Auto-Commit',
            'Not Now',
            'Learn More'
        );

        if (choice === 'Enable Auto-Commit') {
            const config = vscode.workspace.getConfiguration('gitAutoCommit');
            await config.update('enableAutoCommit', true, vscode.ConfigurationTarget.Global);

            vscode.window.showInformationMessage(
                '✓ Auto-commit enabled! Changes will be committed every 10 minutes. You can adjust settings anytime.',
                'Open Settings'
            ).then(action => {
                if (action === 'Open Settings') {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'gitAutoCommit');
                }
            });
        } else if (choice === 'Learn More') {
            vscode.commands.executeCommand('gitAutoCommit.showDashboard');
        }

        await context.globalState.update('hasShownWelcome', true);
    }
}
