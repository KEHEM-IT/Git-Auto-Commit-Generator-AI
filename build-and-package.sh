#!/bin/bash

echo "========================================"
echo "Git Auto Committer - Build and Package"
echo "========================================"
echo

echo "[1/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo

echo "[2/4] Compiling TypeScript..."
npm run compile
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to compile TypeScript"
    exit 1
fi
echo

echo "[3/4] Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "WARNING: Linter found issues"
fi
echo

echo "[4/4] Creating VSIX package..."
vsce package
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create package"
    echo
    echo "Make sure you have vsce installed:"
    echo "npm install -g @vscode/vsce"
    exit 1
fi
echo

echo "========================================"
echo "SUCCESS! Package created successfully!"
echo "========================================"
echo
echo "Your extension package is ready:"
echo "git-auto-committer-generative-ai-1.0.0.vsix"
echo
echo "Next steps:"
echo "1. Test the VSIX: Extensions > ... > Install from VSIX"
echo "2. If everything works, publish: vsce publish"
echo
