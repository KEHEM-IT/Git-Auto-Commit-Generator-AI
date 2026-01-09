"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUI = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("../config/constants");
class DashboardUI {
    static getDashboardHtml(commitHistory, extensionPath, webview) {
        const config = vscode.workspace.getConfiguration('gitAutoCommit');
        const autoEnabled = config.get('enableAutoCommit', false);
        const autoWithoutConfirm = config.get('autoCommitWithoutConfirmation', false);
        const interval = config.get('autoCommitInterval', 10);
        const reminderEnabled = config.get('enableReminder', true);
        const reminderInterval = config.get('reminderInterval', 5);
        const useAI = config.get('useAIGeneration', false);
        const aiProvider = config.get('aiProvider', 'openai');
        const aiModel = config.get('aiModel', '');
        const commitStyle = config.get('commitMessageStyle', 'conventional');
        const apiKeyField = `${aiProvider}ApiKey`;
        const hasApiKey = !!config.get(apiKeyField, '');
        // Get logo URI for webview
        const logoPath = vscode.Uri.file(extensionPath + '/images/icon.png');
        const logoUri = webview ? webview.asWebviewUri(logoPath) : logoPath;
        // Calculate statistics
        const totalCommits = commitHistory.length;
        const todayCommits = commitHistory.filter(c => {
            const today = new Date().setHours(0, 0, 0, 0);
            return c.timestamp >= today;
        }).length;
        const filesChanged = commitHistory.reduce((sum, c) => sum + c.files.length, 0);
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Git Commit Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header with Logo -->
        <div class="text-center mb-10 bg-gradient-to-br from-gray-800 to-purple-900 border border-purple-500 shadow-2xl shadow-purple-500/50 rounded-xl p-8">
            <img src="${logoUri.toString()}" alt="Logo" class="w-20 h-20 mx-auto mb-4 animate-pulse">
            <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                <i class="fas fa-chart-line mr-3"></i>Git Commit Dashboard
            </h1>
            <p class="text-gray-300"><i class="fas fa-rocket mr-2"></i>Track your commits and manage automation</p>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-900 to-blue-700 border border-blue-500 rounded-xl p-6 text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
                <div class="text-5xl mb-3"><i class="fas fa-code-commit text-blue-300"></i></div>
                <div class="text-4xl font-bold mb-2 text-blue-100">${totalCommits}</div>
                <div class="text-sm text-blue-200 uppercase tracking-wider font-semibold">Total Commits</div>
            </div>
            <div class="bg-gradient-to-br from-green-900 to-green-700 border border-green-500 rounded-xl p-6 text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/50 transition-all">
                <div class="text-5xl mb-3"><i class="fas fa-calendar-day text-green-300"></i></div>
                <div class="text-4xl font-bold mb-2 text-green-100">${todayCommits}</div>
                <div class="text-sm text-green-200 uppercase tracking-wider font-semibold">Today's Commits</div>
            </div>
            <div class="bg-gradient-to-br from-purple-900 to-purple-700 border border-purple-500 rounded-xl p-6 text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all">
                <div class="text-5xl mb-3"><i class="fas fa-file-code text-purple-300"></i></div>
                <div class="text-4xl font-bold mb-2 text-purple-100">${filesChanged}</div>
                <div class="text-sm text-purple-200 uppercase tracking-wider font-semibold">Files Changed</div>
            </div>
        </div>

        <!-- Settings Panel -->
        <div class="bg-gradient-to-br from-gray-800 to-purple-900 border border-purple-500 shadow-xl rounded-xl p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-cog text-purple-400 mr-3"></i>Current Configuration
            </h2>
            
            <div class="space-y-4">
                <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all">
                    <div class="font-medium flex items-center">
                        <i class="fas fa-robot text-purple-400 mr-3"></i>Auto Commit
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${autoEnabled ? 'bg-green-500 text-black' : 'bg-red-500 text-black'}">
                            <i class="fas ${autoEnabled ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                            ${autoEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                        <button onclick="toggleAutoCommit()" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <i class="fas ${autoEnabled ? 'fa-pause' : 'fa-play'} mr-2"></i>${autoEnabled ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </div>

                <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all">
                    <div class="font-medium flex items-center">
                        <i class="fas fa-clock text-blue-400 mr-3"></i>Commit Interval
                    </div>
                    <select onchange="updateInterval(this.value)" class="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all">
                        ${[1, 5, 10, 15, 30, 60].map(v => `<option value="${v}" ${interval === v ? 'selected' : ''}>${v} min</option>`).join('')}
                    </select>
                </div>

                <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all">
                    <div class="font-medium flex items-center">
                        <i class="fas fa-bolt text-yellow-400 mr-3"></i>Auto-Commit Without Confirmation
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${autoWithoutConfirm ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}">
                            <i class="fas ${autoWithoutConfirm ? 'fa-bolt' : 'fa-hand-paper'}"></i>
                            ${autoWithoutConfirm ? 'YES' : 'NO'}
                        </span>
                        <button onclick="toggleConfirmation()" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <i class="fas ${autoWithoutConfirm ? 'fa-check' : 'fa-times'} mr-2"></i>${autoWithoutConfirm ? 'Require' : 'Skip'} Confirmation
                        </button>
                    </div>
                </div>

                ${autoWithoutConfirm ? `
                    <div class="flex items-center gap-3 p-4 bg-yellow-900 bg-opacity-30 border-2 border-yellow-500 rounded-lg backdrop-blur-sm animate-pulse">
                        <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl"></i>
                        <span class="text-yellow-300 font-semibold">Commits will be made automatically without asking for confirmation!</span>
                    </div>
                ` : ''}

                <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all">
                    <div class="font-medium flex items-center">
                        <i class="fas fa-bell text-orange-400 mr-3"></i>Commit Reminder
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${reminderEnabled ? 'bg-green-500 text-black' : 'bg-red-500 text-black'}">
                            <i class="fas ${reminderEnabled ? 'fa-bell' : 'fa-bell-slash'}"></i>
                            ${reminderEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                        <select onchange="updateReminderInterval(this.value)" class="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all">
                            ${[1, 5, 10, 15, 30].map(v => `<option value="${v}" ${reminderInterval === v ? 'selected' : ''}>${v} min</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all">
                    <div class="font-medium flex items-center">
                        <i class="fas fa-brain text-pink-400 mr-3"></i>AI Generation
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${useAI ? 'bg-green-500 text-black' : 'bg-red-500 text-black'}">
                            <i class="fas ${useAI ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                            ${useAI ? 'ENABLED' : 'DISABLED'}
                        </span>
                        <button onclick="configureAI()" class="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <i class="fas ${useAI ? 'fa-cog' : 'fa-power-off'} mr-2"></i>${useAI ? 'Reconfigure' : 'Enable'} AI
                        </button>
                    </div>
                </div>

                ${useAI ? `
                    <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30">
                        <div class="font-medium flex items-center">
                            <i class="fas fa-server text-blue-400 mr-3"></i>AI Provider
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="px-4 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white flex items-center gap-2">
                                <i class="fas fa-microchip"></i>${constants_1.PROVIDER_NAMES[aiProvider] || aiProvider}
                            </span>
                            ${hasApiKey ?
            '<span class="text-green-400 flex items-center gap-2"><i class="fas fa-check-circle"></i>API Key Configured</span>' :
            '<span class="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-black flex items-center gap-2"><i class="fas fa-exclamation-triangle"></i>No API Key</span>'}
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30">
                        <div class="font-medium flex items-center">
                            <i class="fas fa-microchip text-green-400 mr-3"></i>AI Model
                        </div>
                        <span class="text-gray-300 flex items-center gap-2">
                            <i class="fas fa-robot"></i>${aiModel || 'Default'}
                        </span>
                    </div>

                    <div class="flex justify-between items-center p-4 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-purple-500 border-opacity-30">
                        <div class="font-medium flex items-center">
                            <i class="fas fa-code text-purple-400 mr-3"></i>Commit Message Style
                        </div>
                        <select onchange="updateCommitStyle(this.value)" class="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all">
                            <option value="conventional" ${commitStyle === 'conventional' ? 'selected' : ''}>Conventional (feat:, fix:)</option>
                            <option value="simple" ${commitStyle === 'simple' ? 'selected' : ''}>Simple</option>
                            <option value="detailed" ${commitStyle === 'detailed' ? 'selected' : ''}>Detailed</option>
                        </select>
                    </div>
                ` : ''}
            </div>

            <div class="flex flex-wrap gap-4 mt-6">
                <button onclick="refresh()" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
                    <i class="fas fa-sync-alt mr-2"></i>Refresh Dashboard
                </button>
                <button onclick="generateCommit()" class="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
                    <i class="fas fa-plus-circle mr-2"></i>Generate Commit
                </button>
                <button onclick="openSettings()" class="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
                    <i class="fas fa-cog mr-2"></i>Advanced Settings
                </button>
                <button onclick="clearHistory()" class="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
                    <i class="fas fa-trash-alt mr-2"></i>Clear History
                </button>
            </div>
        </div>

        <!-- Commits Section -->
        <div class="bg-gradient-to-br from-gray-800 to-purple-900 border border-purple-500 shadow-xl rounded-xl p-8">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-history text-blue-400 mr-3"></i>Recent Commits (${totalCommits})
            </h2>
            
            ${totalCommits === 0 ? `
                <div class="text-center py-16">
                    <i class="fas fa-inbox text-6xl text-gray-600 mb-6"></i>
                    <h3 class="text-2xl font-bold mb-3">No commits yet</h3>
                    <p class="text-gray-400 mb-6">Start committing to see your history here!</p>
                    <button onclick="generateCommit()" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold">
                        <i class="fas fa-rocket mr-2"></i>Make Your First Commit
                    </button>
                </div>
            ` : commitHistory.map(commit => `
                <div class="bg-gradient-to-r from-gray-700 to-gray-800 border-l-4 border-purple-500 rounded-lg p-5 mb-4 hover:from-gray-600 hover:to-gray-700 hover:shadow-xl transition-all">
                    <div class="flex justify-between items-center mb-3">
                        <span class="font-mono text-sm bg-gray-900 text-yellow-300 px-3 py-1 rounded border border-yellow-500 flex items-center gap-2">
                            <i class="fas fa-hashtag"></i>${commit.hash || 'N/A'}
                        </span>
                        <span class="text-sm text-gray-400 flex items-center gap-2">
                            <i class="far fa-clock"></i>${this.formatTime(commit.timestamp)}
                        </span>
                    </div>
                    <div class="text-lg font-semibold mb-2 flex items-center gap-2">
                        <i class="fas fa-comment-dots text-blue-400"></i>
                        ${this.escapeHtml(commit.message.split('\n')[0])}
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="bg-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                            <i class="fas fa-file-code"></i>
                            ${commit.files.length} file${commit.files.length !== 1 ? 's' : ''}
                        </span>
                        <span class="text-gray-400 flex items-center gap-2">
                            <i class="fas fa-folder"></i>
                            ${commit.files.slice(0, 2).join(', ')}${commit.files.length > 2 ? ` +${commit.files.length - 2} more` : ''}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function refresh() {
            vscode.postMessage({ command: 'refresh' });
        }

        function clearHistory() {
            if (confirm('Are you sure you want to clear all commit history?')) {
                vscode.postMessage({ command: 'clearHistory' });
            }
        }

        function configureAI() {
            vscode.postMessage({ command: 'configureAI' });
        }

        function openSettings() {
            vscode.postMessage({ command: 'openSettings' });
        }

        function generateCommit() {
            vscode.postMessage({ command: 'generateCommit' });
        }

        function toggleAutoCommit() {
            vscode.postMessage({ command: 'toggleAutoCommit' });
        }

        function toggleConfirmation() {
            vscode.postMessage({ command: 'toggleConfirmation' });
        }

        function updateInterval(value) {
            vscode.postMessage({ command: 'updateInterval', value: parseInt(value) });
        }

        function updateReminderInterval(value) {
            vscode.postMessage({ command: 'updateReminderInterval', value: parseInt(value) });
        }

        function updateCommitStyle(value) {
            vscode.postMessage({ command: 'updateCommitStyle', value: value });
        }
    </script>
</body>
</html>`;
    }
    static formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        if (minutes > 0)
            return `${minutes}m ago`;
        return 'just now';
    }
    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
exports.DashboardUI = DashboardUI;
//# sourceMappingURL=dashboard.js.map