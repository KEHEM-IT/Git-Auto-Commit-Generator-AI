import * as vscode from 'vscode';

export class WelcomeScreen {
    static async show(context: vscode.ExtensionContext, forceShow: boolean = false): Promise<void> {
        const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
        
        // Skip if already shown and not forced
        if (hasShownWelcome && !forceShow) {
            return;
        }
        
        // Mark as shown before opening to prevent duplicate calls
        if (!forceShow) {
            await context.globalState.update('hasShownWelcome', true);
        }

        const panel = vscode.window.createWebviewPanel(
            'gitAutoCommitWelcome',
            'Welcome to Git Auto Commit',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.file(context.extensionPath)]
            }
        );

        panel.webview.html = this.getWelcomeHtml(context.extensionPath, panel.webview);

        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'enableAutoCommit':
                        const config = vscode.workspace.getConfiguration('gitAutoCommit');
                        await config.update('enableAutoCommit', true, vscode.ConfigurationTarget.Global);
                        vscode.window.showInformationMessage('Auto-commit enabled!');
                        panel.dispose();
                        // Open dashboard after enabling
                        setTimeout(() => {
                            vscode.commands.executeCommand('gitAutoCommit.showDashboard');
                        }, 500);
                        break;
                    case 'configureAI':
                        panel.dispose();
                        vscode.commands.executeCommand('gitAutoCommit.configureAI');
                        break;
                    case 'openSettings':
                        vscode.commands.executeCommand('workbench.action.openSettings', '@ext:KEHEM-IT.git-auto-commit');
                        break;
                    case 'close':
                        panel.dispose();
                        break;
                    case 'dontShowAgain':
                        panel.dispose();
                        break;
                }
            }
        );
    }

    private static getWelcomeHtml(extensionPath: string, webview: vscode.Webview): string {
        const logoPath = vscode.Uri.file(extensionPath + '/images/icon.png');
        const logoUri = webview.asWebviewUri(logoPath);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Git Auto Commit</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .float-animation {
            animation: float 3s ease-in-out infinite;
        } 
    </style>
</head>
<body class="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 min-h-screen p-6">
    <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 pt-16">
            <img src="${logoUri.toString()}" alt="Logo" class="w-24 h-24 mx-auto mb-6 float-animation">
            <h1 class="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
                <i class="fas fa-code-branch"></i>
                Git Auto Commit
            </h1>
            <p class="text-2xl text-purple-200 flex items-center justify-center gap-2">
                <i class="fas fa-brain"></i>
                Intelligent commit automation powered by AI
            </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-purple-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:border-purple-300">
                <div class="text-5xl mb-4 text-purple-300"><i class="fas fa-bolt"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-robot text-purple-300"></i>Auto Commit
                </div>
                <div class="text-purple-100">Automatically commit your changes at customizable intervals. Never lose work again!</div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-pink-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/50 transition-all hover:border-pink-300">
                <div class="text-5xl mb-4 text-pink-300"><i class="fas fa-brain"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-magic text-pink-300"></i>AI-Powered
                </div>
                <div class="text-purple-100">Generate meaningful commit messages using GPT-4, Claude, Gemini, or OpenRouter.</div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-blue-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:border-blue-300">
                <div class="text-5xl mb-4 text-blue-300"><i class="fas fa-chart-line"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-tachometer-alt text-blue-300"></i>Smart Dashboard
                </div>
                <div class="text-purple-100">Track your commit history, view statistics, and manage settings in one place.</div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-yellow-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all hover:border-yellow-300">
                <div class="text-5xl mb-4 text-yellow-300"><i class="fas fa-bell"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-alarm-clock text-yellow-300"></i>Smart Reminders
                </div>
                <div class="text-purple-100">Get notified about uncommitted changes so you never forget to commit.</div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-green-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/50 transition-all hover:border-green-300">
                <div class="text-5xl mb-4 text-green-300"><i class="fas fa-cog"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-sliders-h text-green-300"></i>Highly Configurable
                </div>
                <div class="text-purple-100">Customize intervals, AI models, commit styles, and notification preferences.</div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-indigo-400 rounded-2xl p-8 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all hover:border-indigo-300">
                <div class="text-5xl mb-4 text-indigo-300"><i class="fas fa-display"></i></div>
                <div class="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <i class="fas fa-info-circle text-indigo-300"></i>Status Bar
                </div>
                <div class="text-purple-100">Quick access to all features with live status updates right in your editor.</div>
            </div>
        </div>

        <!-- Quick Start Guide -->
        <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-10 mb-12 hover:border-opacity-50 transition-all">
            <h2 class="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                <i class="fas fa-rocket"></i>Quick Start Guide
            </h2>
            <div class="space-y-5">
                <div class="flex items-center gap-6 p-5 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all border border-purple-400 border-opacity-30 hover:border-opacity-60">
                    <div class="flex-shrink-0 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-40 shadow-lg">
                        <i class="fas fa-toggle-on"></i>
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                            <i class="fas fa-power-off text-green-400"></i>Enable Auto-Commit
                        </div>
                        <div class="text-purple-100">Click the button below or use the status bar icon to enable automatic commits</div>
                    </div>
                </div>

                <div class="flex items-center gap-6 p-5 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all border border-pink-400 border-opacity-30 hover:border-opacity-60">
                    <div class="flex-shrink-0 w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-40 shadow-lg">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                            <i class="fas fa-magic text-pink-400"></i>Configure AI (Optional)
                        </div>
                        <div class="text-purple-100">Set up AI-powered commit messages for more intelligent descriptions</div>
                    </div>
                </div>

                <div class="flex items-center gap-6 p-5 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all border border-blue-400 border-opacity-30 hover:border-opacity-60">
                    <div class="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-40 shadow-lg">
                        <i class="fas fa-cog"></i>
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                            <i class="fas fa-sliders-h text-blue-400"></i>Customize Settings
                        </div>
                        <div class="text-purple-100">Adjust commit intervals, notification preferences, and more</div>
                    </div>
                </div>

                <div class="flex items-center gap-6 p-5 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all border border-green-400 border-opacity-30 hover:border-opacity-60">
                    <div class="flex-shrink-0 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-40 shadow-lg">
                        <i class="fas fa-code"></i>
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                            <i class="fas fa-laptop-code text-green-400"></i>Start Coding!
                        </div>
                        <div class="text-purple-100">Focus on your work while the extension handles commits automatically</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-white bg-opacity-10 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-12 text-center mb-12 hover:border-opacity-50 transition-all">
            <div class="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <i class="fas fa-rocket"></i>Ready to Get Started?
            </div>
            <p class="text-xl text-purple-100 mb-8">Choose your setup path and start committing smarter!</p>
            <div class="flex flex-wrap justify-center gap-4">
                <button onclick="enableAutoCommit()" class="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-play-circle"></i>Enable Auto-Commit
                </button>
                <button onclick="configureAI()" class="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-brain"></i>Configure AI
                </button>
                <button onclick="openSettings()" class="px-8 py-4 bg-white bg-opacity-15 hover:bg-opacity-25 text-white font-semibold rounded-xl border-2 border-white border-opacity-40 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-cog"></i>Open Settings
                </button>
                <button onclick="dontShowAgain()" class="px-8 py-4 bg-white bg-opacity-15 hover:bg-opacity-25 text-white font-semibold rounded-xl border-2 border-white border-opacity-40 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-check-circle"></i>Got It!
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center pb-12">
            <p class="text-purple-100 mb-3 flex items-center justify-center gap-2">
                <i class="fas fa-lightbulb"></i>
                Access this screen anytime from the status bar menu → About
            </p>
            <p class="text-purple-100 flex items-center justify-center gap-2">
                Made with <i class="fas fa-heart text-red-400"></i> by <strong>KEHEM IT</strong>
            </p>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function enableAutoCommit() {
            vscode.postMessage({ command: 'enableAutoCommit' });
        }

        function configureAI() {
            vscode.postMessage({ command: 'configureAI' });
        }

        function openSettings() {
            vscode.postMessage({ command: 'openSettings' });
        }

        function dontShowAgain() {
            vscode.postMessage({ command: 'dontShowAgain' });
        }
    </script>
</body>
</html>`;
    }
}
