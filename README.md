# Git Auto Commit Generator

> 🚀 **Intelligent commit message generation powered by AI and smart defaults**

Never write commit messages manually again! Git Auto Commit Generator analyzes your code changes and creates meaningful, professional commit messages automatically. Whether you prefer AI-powered messages or smart default generation, this extension has you covered.

![Git Auto Commit Generator](https://raw.githubusercontent.com/KEHEM-IT/Git-Auto-Committer---Generative-AI/refs/heads/main/assets/Auto_Git_Commit_Message_Generate.gif)

## ✨ Features

### 🤖 **AI-Powered Commit Messages**
- Support for **OpenAI**, **Anthropic Claude**, **Google Gemini**, and **OpenRouter**
- Context-aware message generation based on actual code changes
- Follows best practices and conventional commit standards
- Smart fallback to default generator when AI is unavailable

### 📝 **Smart Default Generation**
- **No AI required** - works perfectly without any API keys
- Three message styles to match your workflow:
  - **Conventional**: `feat(scope): subject` - Standard conventional commits
  - **Simple**: Clear, readable descriptions like "Updated 5 TypeScript files"
  - **Detailed**: Narrative-style messages with full context
- Intelligent file type detection and categorization
- Automatic change type classification (features, fixes, docs, etc.)

### ⏰ **Auto-Commit Timer**
- Automatic commits at customizable intervals (1-120 minutes)
- Two modes: with confirmation (safe) or without (advanced)
- Smart detection of uncommitted changes
- Configurable reminders to prevent forgotten commits

### 📊 **Commit History Dashboard**
- Beautiful visual dashboard showing your commit history
- View timestamps, messages, and affected files
- Statistics and insights about your commits
- Quick access via status bar icon

### 🎯 **Seamless Integration**
- Works with VS Code's built-in Git support
- Status bar integration for quick access
- Command palette commands for all features
- Automatic staging of changes before commit

## 🎬 Demo

### Quick Commit Generation
![Generate Commit Message](https://raw.githubusercontent.com/KEHEM-IT/Git-Auto-Committer---Generative-AI/refs/heads/main/assets/Detailed_Generate_Messages.gif)

### Dashboard Overview
![Commit Dashboard](https://raw.githubusercontent.com/yourusername/git-auto-commit/main/demo-dashboard.webp)

## 🚀 Quick Start

1. **Install** the extension from the VS Code Marketplace
2. **Make changes** to your code
3. **Generate commit** via Command Palette or status bar
4. **Review and commit** - that's it!

### First-Time Setup

On first use, you'll see a welcome screen to configure your preferences:
- Enable/disable auto-commit
- Choose your commit message style
- Optionally configure AI provider

## 📖 Usage

### Generate Commit Messages

**Method 1: Command Palette**
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type "Generate Commit Message"
- Press Enter

**Method 2: Status Bar**
- Click the Git Auto Commit icon in the status bar
- Choose "Generate Commit"

**What happens next:**
1. Extension analyzes your changes
2. Generates a commit message (2-second notification)
3. Opens Source Control view with message ready
4. Review and click commit when ready

### View Commit History

- Click the status bar icon
- Select "Show Dashboard"
- View your commits, statistics, and more

### Configure AI (Optional)

- Run "Git Auto Commit: Configure AI" from Command Palette
- Choose your AI provider
- Enter your API key
- Select your preferred model

## ⚙️ Settings

### Core Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `gitAutoCommit.commitMessageStyle` | `conventional` | Message style: `conventional`, `simple`, or `detailed` |
| `gitAutoCommit.enableAutoCommit` | `false` | Enable automatic commits on timer |
| `gitAutoCommit.autoCommitInterval` | `10` | Auto-commit interval (1-120 minutes) |
| `gitAutoCommit.autoCommitWithoutConfirmation` | `false` | ⚠️ Commit without asking (use carefully!) |
| `gitAutoCommit.enableReminder` | `true` | Show reminders for uncommitted changes |
| `gitAutoCommit.reminderInterval` | `5` | Reminder interval (1-60 minutes) |

### AI Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `gitAutoCommit.useAIGeneration` | `false` | Enable AI-powered commit messages |
| `gitAutoCommit.aiProvider` | `openai` | AI provider: `openai`, `anthropic`, `gemini`, `openrouter` |
| `gitAutoCommit.aiApiKey` | `""` | Your API key for the selected provider |
| `gitAutoCommit.aiModel` | `gpt-4o-mini` | Model to use for generation |

### Quick Configuration Examples

**Simple, human-readable messages (no AI needed):**
```json
{
  "gitAutoCommit.commitMessageStyle": "simple"
}
```

**AI-powered with OpenAI:**
```json
{
  "gitAutoCommit.useAIGeneration": true,
  "gitAutoCommit.aiProvider": "openai",
  "gitAutoCommit.aiApiKey": "sk-..."
}
```

**Auto-commit every 15 minutes with confirmation:**
```json
{
  "gitAutoCommit.enableAutoCommit": true,
  "gitAutoCommit.autoCommitInterval": 15,
  "gitAutoCommit.autoCommitWithoutConfirmation": false
}
```

## 🎨 Commit Message Styles

### Conventional (Default)
```
feat(src): update 3 ts files

- 3 files changed: 45 insertions(+), 12 deletions(-)
```

### Simple
```
Updated 5 TypeScript files in src
```

### Detailed
```
Enhanced 3 files with improvements

Changes include: Updated 3 TypeScript files

Modified 90 lines (+67 additions, -23 deletions)
```

[Learn more about commit message styles →](COMMIT_MESSAGE_STYLES.md)

## 🤖 AI Providers

### Supported Providers

| Provider | Models | Configuration |
|----------|--------|---------------|
| **OpenAI** | gpt-4o, gpt-4o-mini, gpt-4-turbo | [Get API Key](https://platform.openai.com/api-keys) |
| **Anthropic** | claude-3.5-sonnet, claude-3-opus | [Get API Key](https://console.anthropic.com/) |
| **Google Gemini** | gemini-pro, gemini-ultra | [Get API Key](https://makersuite.google.com/app/apikey) |
| **OpenRouter** | Multiple models | [Get API Key](https://openrouter.ai/keys) |

### Setting Up AI

1. Run command: **"Git Auto Commit: Configure AI"**
2. Select your provider
3. Enter your API key
4. Choose model
5. Enable "Use AI Generation"

No API key? No problem! The extension works perfectly with smart default generation.

## 📊 Dashboard Features

The commit history dashboard provides:

- ✅ **Current settings overview** - See your configuration at a glance
- 📈 **Commit statistics** - Total commits, recent activity
- 📋 **Commit history** - Last 50 commits with timestamps
- 📁 **File details** - Which files were changed in each commit
- 🔄 **Quick actions** - Refresh, clear history, adjust settings

## ⚠️ Auto-Commit Safety

### With Confirmation (Recommended)
```json
{
  "gitAutoCommit.autoCommitWithoutConfirmation": false
}
```
- Timer triggers notification
- Review message before committing
- Choose "Commit Now" or "Skip"
- ✅ Safe for all projects

### Without Confirmation (Advanced)
```json
{
  "gitAutoCommit.autoCommitWithoutConfirmation": true
}
```
- Commits automatically without asking
- ⚠️ Use only for personal projects
- Not recommended for team/production code
- Great for experimentation and prototyping

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `Git Auto Commit: Generate Commit Message` | Generate message for current changes |
| `Git Auto Commit: Show Dashboard` | View commit history and stats |
| `Git Auto Commit: Configure AI` | Set up AI provider and API key |
| `Git Auto Commit: Toggle Auto Commit` | Enable/disable auto-commit timer |

## 📚 Documentation

- [Commit Message Styles Guide](COMMIT_MESSAGE_STYLES.md) - Detailed style examples
- [Setup Guide](SETUP_GUIDE.md) - Complete setup instructions
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions
- [AI Setup Guide](AI_SETUP_GUIDE.md) - Configure AI providers

## 🔧 Requirements

- VS Code 1.85.0 or higher
- Git installed and accessible from command line
- Active Git repository in workspace
- (Optional) API key for AI-powered messages

## 🐛 Troubleshooting

### Extension not generating messages?
- Ensure you have uncommitted changes
- Check you're in a Git repository
- Verify Git is installed: `git --version`

### AI not working?
- Verify API key is correct
- Check "Use AI Generation" is enabled
- Ensure you have internet connection
- Extension falls back to default generator automatically

### Auto-commit not triggering?
- Check "Enable Auto Commit" is turned on
- Verify there are changes to commit
- Review auto-commit interval setting

[View full troubleshooting guide →](TROUBLESHOOTING.md)

## 📝 Changelog

### Version 1.0.5 (Latest)
- ✨ Added three commit message styles (conventional, simple, detailed)
- 🤖 AI-powered commit message generation
- 📊 Enhanced dashboard with statistics
- 🎨 Improved UI and notifications
- 🐛 Bug fixes and performance improvements

### Version 1.0.0
- 🎉 Initial release
- ⏰ Auto-commit timer
- 📋 Commit history dashboard
- 🔔 Commit reminders

[View full changelog →](CHANGELOG.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE.txt) for details

## 💬 Support & Feedback

- 🐛 [Report Issues](https://github.com/yourusername/git-auto-commit/issues)
- 💡 [Request Features](https://github.com/yourusername/git-auto-commit/discussions)
- ⭐ [Star on GitHub](https://github.com/yourusername/git-auto-commit)
- 📧 Contact: your-email@example.com

---

**Made with ❤️ for developers who value clean commit history**

**Happy Committing! 🚀**
