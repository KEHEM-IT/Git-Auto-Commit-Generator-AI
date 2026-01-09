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
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = this.getWelcomeHtml();

        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'enableAutoCommit':
                        const config = vscode.workspace.getConfiguration('gitAutoCommit');
                        await config.update('enableAutoCommit', true, vscode.ConfigurationTarget.Global);
                        vscode.window.showInformationMessage('✓ Auto-commit enabled!');
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

    private static getWelcomeHtml(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Git Auto Commit</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* VS Code Dark Theme Colors */
        :root {
            --vscode-bg: #1e1e1e;
            --vscode-fg: #cccccc;
            --vscode-editor-bg: #252526;
            --vscode-sidebar-bg: #252526;
            --vscode-input-bg: #3c3c3c;
            --vscode-border: #3c3c3c;
            --vscode-button-bg: #0e639c;
            --vscode-button-hover-bg: #1177bb;
            --vscode-accent: #007acc;
            --vscode-list-hover: #2a2d2e;
        }

        body {
            font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif);
            background-color: var(--vscode-bg);
            color: var(--vscode-fg);
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes float {
            0%, 100% { 
                transform: translateY(0) rotate(0deg); 
            }
            25% { 
                transform: translateY(-10px) rotate(-5deg); 
            }
            75% { 
                transform: translateY(-15px) rotate(5deg); 
            }
        }

        @keyframes pulse {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.3;
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.3);
                opacity: 0;
            }
        }

        @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes glow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1); }
        }

        @keyframes float-particle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
            }
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
        }

        .animate-float {
            animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-custom {
            animation: pulse 2s ease-in-out infinite;
        }

        .animate-sparkle {
            animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-fadeIn {
            animation: fadeIn 0.6s ease-out backwards;
        }

        .animate-glow {
            animation: glow 2s ease-in-out infinite;
        }

        .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
        }

        .particle {
            animation: float-particle 10s infinite ease-in-out;
        }

        .feature-card-1 { animation-delay: 0.1s; }
        .feature-card-2 { animation-delay: 0.2s; }
        .feature-card-3 { animation-delay: 0.3s; }
        .feature-card-4 { animation-delay: 0.4s; }
        .feature-card-5 { animation-delay: 0.5s; }
        .feature-card-6 { animation-delay: 0.6s; }

        .glass-effect {
            background: rgba(37, 37, 38, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid var(--vscode-border);
        }

        .btn-vscode {
            background-color: var(--vscode-button-bg);
            color: white;
            transition: all 0.3s ease;
        }

        .btn-vscode:hover {
            background-color: var(--vscode-button-hover-bg);
        }

        .btn-vscode-secondary {
            background-color: var(--vscode-input-bg);
            color: var(--vscode-fg);
            border: 1px solid var(--vscode-border);
            transition: all 0.3s ease;
        }

        .btn-vscode-secondary:hover {
            background-color: var(--vscode-list-hover);
            border-color: var(--vscode-accent);
        }
    </style>
</head>
<body class="min-h-screen overflow-x-hidden p-5">
    <div class="fixed inset-0 pointer-events-none z-0" id="particles"></div>
    
    <div class="max-w-6xl mx-auto animate-fadeInUp relative z-10">
        <!-- Header -->
        <div class="text-center mb-12 pt-16 pb-10">
            <div class="relative inline-block mb-8">
                <div class="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse-custom"></div>
                <div class="text-9xl animate-float relative z-10">
                    <i class="fa-solid fa-rocket text-blue-400"></i>
                </div>
            </div>
            <h1 class="text-6xl font-bold mb-4 text-gray-100">Git Auto Commit</h1>
            <p class="text-2xl text-gray-300 font-light flex items-center justify-center gap-3">
                <i class="fa-solid fa-sparkles text-yellow-400 animate-sparkle"></i>
                Intelligent commit automation powered by AI
                <i class="fa-solid fa-sparkles text-yellow-400 animate-sparkle"></i>
            </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            <!-- Feature 1 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-1">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-bolt text-yellow-400"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-circle-check text-green-500 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">Auto Commit</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Automatically commit your changes at customizable intervals. Never lose work again!</p>
            </div>

            <!-- Feature 2 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-2">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-brain text-pink-400"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-wand-magic-sparkles text-pink-400 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">AI-Powered</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Generate meaningful commit messages using GPT-4, Claude, Gemini, or OpenRouter.</p>
            </div>

            <!-- Feature 3 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-3">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-chart-line text-cyan-400"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-chart-pie text-cyan-400 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">Smart Dashboard</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Track your commit history, view statistics, and manage settings in one place.</p>
            </div>

            <!-- Feature 4 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-4">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-bell text-orange-400"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-bell-concierge text-orange-400 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">Smart Reminders</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Get notified about uncommitted changes so you never forget to commit.</p>
            </div>

            <!-- Feature 5 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-5">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-sliders text-green-500"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-palette text-green-500 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">Highly Configurable</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Customize intervals, AI models, commit styles, and notification preferences.</p>
            </div>

            <!-- Feature 6 -->
            <div class="glass-effect rounded-2xl p-8 hover:bg-[#2d2d30] hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeIn feature-card-6">
                <div class="text-5xl mb-5 inline-block transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    <i class="fa-solid fa-gauge-high text-rose-500"></i>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <i class="fa-solid fa-display text-rose-500 text-lg"></i>
                    <h3 class="text-2xl font-semibold text-gray-100">Status Bar</h3>
                </div>
                <p class="text-gray-300 text-base leading-relaxed">Quick access to all features with live status updates right in your editor.</p>
            </div>
        </div>

        <!-- Quick Start -->
        <div class="glass-effect rounded-3xl p-10 my-12">
            <h2 class="text-3xl font-semibold text-center mb-9 text-gray-100 flex items-center justify-center gap-4">
                <i class="fa-solid fa-bullseye text-yellow-400"></i>
                Quick Start Guide
            </h2>
            <div class="flex flex-col gap-5">
                <!-- Step 1 -->
                <div class="flex items-center gap-6 p-5 bg-[#2a2d2e] rounded-xl hover:bg-[#2d2d30] hover:translate-x-2 transition-all duration-300 border border-[#3c3c3c]">
                    <div class="text-3xl font-bold bg-gradient-to-br from-[#3c3c3c] to-[#2a2d2e] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#4c4c4c] text-gray-100">1</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-toggle-on text-blue-400"></i>
                            <h4 class="font-semibold text-lg text-gray-100">Enable Auto-Commit</h4>
                        </div>
                        <p class="text-gray-300 text-base leading-relaxed">Click the button below or use the status bar icon to enable automatic commits</p>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="flex items-center gap-6 p-5 bg-[#2a2d2e] rounded-xl hover:bg-[#2d2d30] hover:translate-x-2 transition-all duration-300 border border-[#3c3c3c]">
                    <div class="text-3xl font-bold bg-gradient-to-br from-[#3c3c3c] to-[#2a2d2e] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#4c4c4c] text-gray-100">2</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-robot text-pink-400"></i>
                            <h4 class="font-semibold text-lg text-gray-100">Configure AI (Optional)</h4>
                        </div>
                        <p class="text-gray-300 text-base leading-relaxed">Set up AI-powered commit messages for more intelligent descriptions</p>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="flex items-center gap-6 p-5 bg-[#2a2d2e] rounded-xl hover:bg-[#2d2d30] hover:translate-x-2 transition-all duration-300 border border-[#3c3c3c]">
                    <div class="text-3xl font-bold bg-gradient-to-br from-[#3c3c3c] to-[#2a2d2e] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#4c4c4c] text-gray-100">3</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-screwdriver-wrench text-cyan-400"></i>
                            <h4 class="font-semibold text-lg text-gray-100">Customize Settings</h4>
                        </div>
                        <p class="text-gray-300 text-base leading-relaxed">Adjust commit intervals, notification preferences, and more</p>
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="flex items-center gap-6 p-5 bg-[#2a2d2e] rounded-xl hover:bg-[#2d2d30] hover:translate-x-2 transition-all duration-300 border border-[#3c3c3c]">
                    <div class="text-3xl font-bold bg-gradient-to-br from-[#3c3c3c] to-[#2a2d2e] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#4c4c4c] text-gray-100">4</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-code text-green-400"></i>
                            <h4 class="font-semibold text-lg text-gray-100">Start Coding!</h4>
                        </div>
                        <p class="text-gray-300 text-base leading-relaxed">Focus on your work while the extension handles commits automatically</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="glass-effect rounded-3xl p-12 my-12 text-center">
            <div class="text-4xl font-semibold mb-4 text-gray-100 flex items-center justify-center gap-3">
                <i class="fa-solid fa-star text-yellow-400"></i>
                Ready to Get Started?
            </div>
            <p class="text-gray-300 mb-8 text-lg">Choose your setup path and start committing smarter!</p>
            <div class="flex flex-wrap gap-5 justify-center mt-8">
                <button onclick="enableAutoCommit()" class="btn-vscode px-12 py-5 rounded-xl text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 transition-all duration-300 shadow-lg">
                    <i class="fa-solid fa-bolt text-xl"></i>
                    <span>Enable Auto-Commit</span>
                </button>
                <button onclick="configureAI()" class="btn-vscode px-12 py-5 rounded-xl text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 transition-all duration-300 shadow-lg">
                    <i class="fa-solid fa-brain text-xl"></i>
                    <span>Configure AI</span>
                </button>
                <button onclick="openSettings()" class="btn-vscode-secondary px-12 py-5 rounded-xl text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 transition-all duration-300">
                    <i class="fa-solid fa-gear text-xl"></i>
                    <span>Open Settings</span>
                </button>
                <button onclick="dontShowAgain()" class="btn-vscode-secondary px-12 py-5 rounded-xl text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 transition-all duration-300">
                    <i class="fa-solid fa-circle-check text-xl"></i>
                    <span>Got It!</span>
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 pb-8 text-gray-400">
            <div class="flex flex-col gap-4 items-center">
                <p class="flex items-center gap-3 text-lg">
                    <i class="fa-solid fa-lightbulb text-yellow-400 animate-glow"></i>
                    Access this screen anytime from the status bar menu → About
                </p>
                <p class="flex items-center gap-2 text-lg">
                    Made with <i class="fa-solid fa-heart text-red-500 animate-heartbeat"></i> by
                    <strong class="text-gray-200">KEHEM IT</strong>
                </p>
            </div>
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

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle absolute w-1 h-1 bg-blue-400/50 rounded-full';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();
    </script>
</body>
</html>`;
    }
}
