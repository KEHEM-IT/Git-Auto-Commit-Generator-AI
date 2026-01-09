# Publishing to VS Code Marketplace

This guide will help you publish the Git Auto Committer extension to the Visual Studio Code Marketplace.

## Prerequisites

1. **Create a Publisher Account**
   - Visit: https://marketplace.visualstudio.com/manage
   - Sign in with your Microsoft/Azure account
   - Create a publisher with ID: `KEHEMIT`

2. **Install vsce (VS Code Extension Manager)**
   ```bash
   npm install -g @vscode/vsce
   ```

3. **Get a Personal Access Token (PAT)**
   - Go to: https://dev.azure.com/
   - User Settings → Personal Access Tokens
   - Create new token with:
     - Organization: All accessible organizations
     - Expiration: 1 year (or custom)
     - Scopes: **Marketplace (Manage)**

## Pre-Publishing Checklist

### ✅ Required Files
- [x] `package.json` - Updated with correct publisher and name
- [x] `README.md` - Comprehensive documentation
- [x] `LICENSE` - MIT License
- [x] `CHANGELOG.md` - Version history
- [x] `images/icon.png` - Extension icon (128x128 or larger)
- [x] `.vscodeignore` - Files to exclude from package

### ✅ Verification Steps

1. **Test the Extension Locally**
   ```bash
   # Compile the extension
   npm run compile
   
   # Press F5 in VS Code to launch Extension Development Host
   # Test all features thoroughly
   ```

2. **Verify Package Contents**
   ```bash
   # Package the extension
   vsce package
   
   # This creates: git-auto-committer-generative-ai-1.0.0.vsix
   ```

3. **Install and Test VSIX**
   - In VS Code: Extensions → ... → Install from VSIX
   - Test all functionality
   - Check welcome screen appears
   - Verify logo is displayed correctly

## Publishing Steps

### Step 1: Login to VSCE
```bash
vsce login KEHEMIT
# Enter your Personal Access Token when prompted
```

### Step 2: Package the Extension
```bash
vsce package
```

This creates a `.vsix` file you can test before publishing.

### Step 3: Publish to Marketplace
```bash
vsce publish
```

Or publish with a specific version:
```bash
vsce publish 1.0.0
```

### Step 4: Verify Publication
1. Visit: https://marketplace.visualstudio.com/items?itemName=KEHEMIT.git-auto-committer-generative-ai
2. Check that all information appears correctly:
   - Icon
   - Description
   - Screenshots (if added)
   - README content
   - Ratings section

## Post-Publishing

### Update Extension
```bash
# Update version in package.json
# Make your changes
# Commit changes

# Publish update
vsce publish patch  # 1.0.0 → 1.0.1
# or
vsce publish minor  # 1.0.0 → 1.1.0
# or
vsce publish major  # 1.0.0 → 2.0.0
```

### Unpublish Extension
```bash
vsce unpublish KEHEMIT.git-auto-committer-generative-ai
```

⚠️ **Warning**: Unpublishing is permanent!

## Marketplace Optimization

### 1. Add Screenshots
Create screenshots showing:
- Welcome screen with logo
- Dashboard interface
- Status bar menu
- AI configuration
- Commit generation in action

Save to `images/` folder and reference in README:
```markdown
![Screenshot 1](images/screenshot1.png)
![Screenshot 2](images/screenshot2.png)
```

### 2. Add a GIF Demo
Record a short demo showing the extension in action:
- Install and enable
- Generate commit
- View dashboard

### 3. Update Keywords
Already done in `package.json`, but consider adding more:
- "productivity"
- "development"
- "version control"
- "automation"

### 4. Categories
Already set to:
- SCM Providers
- Machine Learning
- Other

## Troubleshooting

### Error: "Publisher 'KEHEMIT' not found"
- Create the publisher at https://marketplace.visualstudio.com/manage/createpublisher
- Use exactly `KEHEMIT` (no spaces)

### Error: "Extension name already exists"
- The name in `package.json` must be globally unique
- Current name: `git-auto-committer-generative-ai` should be unique

### Error: "Missing icon"
- Ensure `images/icon.png` exists
- Icon should be at least 128x128 pixels
- PNG format with transparency

### Publishing Hangs
- Check your internet connection
- Verify your PAT is still valid
- Try: `vsce logout` then `vsce login KEHEMIT`

## Best Practices

1. **Semantic Versioning**
   - MAJOR: Breaking changes
   - MINOR: New features
   - PATCH: Bug fixes

2. **Always Update CHANGELOG.md**
   - Document all changes
   - Include version number and date
   - List new features, fixes, and breaking changes

3. **Test Before Publishing**
   - Create VSIX and test locally
   - Test on clean VS Code installation
   - Verify all features work

4. **Monitor Feedback**
   - Check marketplace Q&A section
   - Respond to issues on GitHub
   - Update based on user feedback

## Support Links

- **Publisher Dashboard**: https://marketplace.visualstudio.com/manage/publishers/KEHEMIT
- **Extension Page**: https://marketplace.visualstudio.com/items?itemName=KEHEMIT.git-auto-committer-generative-ai
- **GitHub Repo**: https://github.com/KEHEM-IT/Git-Auto-Committer-Generative-AI
- **Website**: https://www.kehem.com

## Quick Reference

```bash
# Package only (create .vsix)
vsce package

# Publish new version
vsce publish

# Publish specific version
vsce publish 1.0.0

# Publish and increment patch version
vsce publish patch

# Publish and increment minor version
vsce publish minor

# Publish and increment major version
vsce publish major

# Show extension info
vsce show KEHEMIT.git-auto-committer-generative-ai

# Unpublish (use with caution!)
vsce unpublish KEHEMIT.git-auto-committer-generative-ai
```

---

**Good luck with your extension! 🚀**

Made with ❤️ by KEHEM IT  
[www.kehem.com](https://www.kehem.com)
