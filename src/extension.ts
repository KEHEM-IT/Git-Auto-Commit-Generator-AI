import * as vscode from 'vscode';
import { StatusBarManager } from './ui/statusBar';
import { WelcomeScreen } from './ui/welcomeScreen';
import { TimerManager } from './services/timerManager';
import { GenerateCommitCommand } from './commands/generateCommit';
import { ShowDashboardCommand } from './commands/showDashboard';
import { ConfigureAICommand } from './commands/configureAI';

let statusBarManager: StatusBarManager;
let timerManager: TimerManager;

export function activate(context: vscode.ExtensionContext) {
    console.log('Git Auto Commit extension activated');

    // Initialize managers
    statusBarManager = new StatusBarManager();
    timerManager = new TimerManager();

    // Show welcome screen
    WelcomeScreen.show(context);

    // Update status bar
    statusBarManager.update();
    context.subscriptions.push(statusBarManager.getStatusBarItem());

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('gitAutoCommit.generateCommit', () => 
            GenerateCommitCommand.execute(context)
        ),
        vscode.commands.registerCommand('gitAutoCommit.showDashboard', () => 
            ShowDashboardCommand.execute(context)
        ),
        vscode.commands.registerCommand('gitAutoCommit.toggleAutoCommit', () => 
            toggleAutoCommit(context)
        ),
        vscode.commands.registerCommand('gitAutoCommit.configureAI', () => 
            ConfigureAICommand.execute(context)
        )
    );

    // Start timers if enabled
    const config = vscode.workspace.getConfiguration('gitAutoCommit');
    if (config.get('enableAutoCommit', false)) {
        timerManager.startAutoCommitTimer(context);
    }

    if (config.get('enableReminder', true)) {
        timerManager.startReminderTimer(context);
    }

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('gitAutoCommit')) {
                handleConfigChange(context);
            }
        })
    );
}

function handleConfigChange(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('gitAutoCommit');

    if (config.get('enableAutoCommit', false)) {
        timerManager.startAutoCommitTimer(context);
    } else {
        timerManager.stopAutoCommitTimer();
    }

    if (config.get('enableReminder', true)) {
        timerManager.startReminderTimer(context);
    } else {
        timerManager.stopReminderTimer();
    }

    statusBarManager.update();
}

function toggleAutoCommit(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('gitAutoCommit');
    const current = config.get('enableAutoCommit', false);
    config.update('enableAutoCommit', !current, vscode.ConfigurationTarget.Global);
}

export function deactivate() {
    timerManager.stopAllTimers();
}
