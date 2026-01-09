@echo off
echo ========================================
echo Git Auto Committer - Build and Package
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Compiling TypeScript...
call npm run compile
if errorlevel 1 (
    echo ERROR: Failed to compile TypeScript
    pause
    exit /b 1
)
echo.

echo [3/4] Running linter...
call npm run lint
if errorlevel 1 (
    echo WARNING: Linter found issues
)
echo.

echo [4/4] Creating VSIX package...
call vsce package
if errorlevel 1 (
    echo ERROR: Failed to create package
    echo.
    echo Make sure you have vsce installed:
    echo npm install -g @vscode/vsce
    pause
    exit /b 1
)
echo.

echo ========================================
echo SUCCESS! Package created successfully!
echo ========================================
echo.
echo Your extension package is ready:
echo git-auto-committer-generative-ai-1.0.0.vsix
echo.
echo Next steps:
echo 1. Test the VSIX: Extensions ^> ... ^> Install from VSIX
echo 2. If everything works, publish: vsce publish
echo.

pause
