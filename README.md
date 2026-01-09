# Git Auto Committer - Generative AI

![Logo](images/icon.png)

**Never lose your work again!** Git Auto Committer is an intelligent VS Code extension that automatically generates meaningful commit messages and manages commits using cutting-edge AI models including GPT-4, Claude, Gemini, and OpenRouter.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=KEHEMIT.git-auto-committer-generative-ai)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Made by KEHEM IT](https://img.shields.io/badge/made%20by-KEHEM%20IT-orange.svg)](https://www.kehem.com)

## ✨ Features

### 🚀 Auto-Commit
Automatically commit your changes at customizable intervals. Set it and forget it - your work is always saved!

### 🧠 AI-Powered Commit Messages
Generate meaningful, context-aware commit messages using state-of-the-art AI models:
- **OpenAI GPT-4** - Industry-leading language model
- **Anthropic Claude** - Advanced reasoning capabilities
- **Google Gemini** - Multimodal AI understanding
- **OpenRouter** - Access to multiple AI models

### 📊 Smart Dashboard
Track your commit history, view statistics, and manage all settings in one beautiful interface.

### 🔔 Smart Reminders
Get notified about uncommitted changes so you never forget to commit your important work.

### ⚙️ Highly Configurable
- Customize commit intervals (1-120 minutes)
- Choose your preferred AI model and provider
- Select commit message styles (conventional, simple, detailed)
- Configure notification preferences

### 📈 Status Bar Integration
Quick access to all features with live status updates right in your VS Code status bar.

## 🎯 Quick Start

1. **Install the Extension**
   - Search for "Git Auto Committer - Generative AI" in VS Code Extensions
   - Click Install

2. **Enable Auto-Commit**
   - Click the Git icon in your status bar
   - Select "Enable Auto-Commit"

3. **Configure AI (Optional)**
   - Open the quick menu from status bar
   - Select "Configure AI"
   - Enter your API key for your preferred provider

4. **Start Coding!**
   - The extension handles everything automatically
   - Focus on your code while commits happen in the background

## 📖 Usage

### Status Bar Menu
Click the Git icon in your status bar to access:
- Generate & Commit
- Check Changes
- Toggle Auto-Commit
- Configure AI
- Open Dashboard
- Settings

### Commands
Access via Command Palette (`Ctrl/Cmd + Shift + P`):
- `Git Auto Commit: Generate Commit Message`
- `Git Auto Commit: Show Dashboard`
- `Git Auto Commit: Toggle Auto Commit`
- `Git Auto Commit: Configure AI`
- `Git Auto Commit: Show Welcome Screen`

## ⚙️ Configuration

### Basic Settings
- **Enable Auto-Commit**: Turn automatic commits on/off
- **Auto-Commit Interval**: Time between automatic commits (1-120 minutes)
- **Enable Reminder**: Get notifications for uncommitted changes
- **Reminder Interval**: Time between reminder notifications (1-60 minutes)

### AI Settings
- **Use AI Generation**: Enable AI-powered commit messages
- **AI Provider**: Choose between OpenAI, Anthropic, Gemini, or OpenRouter
- **AI Model**: Specify the exact model (e.g., gpt-4o-mini, claude-3-5-sonnet)
- **API Keys**: Secure storage for your AI provider API keys
- **Commit Message Style**: Choose conventional, simple, or detailed format

## 🔐 Security

- API keys are stored securely in VS Code's settings
- Never committed to your repository
- Transmitted only to your chosen AI provider
- No data collection or telemetry

## 🎨 Commit Message Styles

### Conventional Commits
```
feat: add user authentication
fix: resolve login page crash
docs: update API documentation
```

### Simple
```
Add user authentication
Fix login page crash
Update API documentation
```

### Detailed
```
Implement comprehensive user authentication system with JWT tokens,
including login, logout, and session management features
```

## 🤖 Supported AI Providers

### OpenAI
- GPT-4, GPT-4 Turbo, GPT-3.5
- Get your API key: https://platform.openai.com/api-keys

### Anthropic Claude
- Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- Get your API key: https://console.anthropic.com/

### Google Gemini
- Gemini Pro, Gemini Ultra
- Get your API key: https://makersuite.google.com/app/apikey

### OpenRouter
- Access to 100+ models including GPT-4, Claude, Llama, and more
- Get your API key: https://openrouter.ai/keys

## 📊 Dashboard Features

- **Commit History**: View all your commits with timestamps
- **Statistics**: Track your commit patterns and productivity
- **Quick Actions**: Enable/disable features, configure settings
- **Visual Analytics**: Beautiful charts showing your commit activity

## 🛠️ Requirements

- Visual Studio Code 1.75.0 or higher
- Git installed and configured
- Active Git repository
- (Optional) API key for AI-powered features

## 🐛 Troubleshooting

### Auto-commit not working?
1. Ensure Git is installed and repository is initialized
2. Check that auto-commit is enabled in settings
3. Verify you have uncommitted changes

### AI generation failing?
1. Verify your API key is correct
2. Check your internet connection
3. Ensure you have API credits/quota remaining
4. Try a different AI provider

### Extension not appearing?
1. Reload VS Code window
2. Check extension is enabled
3. Verify you're in a Git repository

## 📝 Release Notes

### Version 1.0.0
- 🎉 Initial release
- ✨ Auto-commit functionality
- 🤖 Multi-provider AI support
- 📊 Interactive dashboard
- 🔔 Smart notifications
- ⚙️ Comprehensive settings

## 🤝 Contributing

We welcome contributions! Visit our GitHub repository to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

## 🌐 Links

- **Website**: [www.kehem.com](https://www.kehem.com)
- **GitHub**: [KEHEM-IT](https://github.com/KEHEM-IT)
- **Support**: Report issues on GitHub

## 💖 Support

If you find this extension helpful, please:
- ⭐ Star us on GitHub
- 📝 Leave a review on the VS Code Marketplace
- 🐦 Share with your developer friends

---

**Made with ❤️ by KEHEM IT**

[www.kehem.com](https://www.kehem.com)
