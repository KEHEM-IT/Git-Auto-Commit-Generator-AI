import * as vscode from 'vscode';
import fetch from 'node-fetch';
import { AIProviderType } from '../types';

export class AIService {
    static async generateCommitMessage(files: string[], diff: string): Promise<string> {
        const config = vscode.workspace.getConfiguration('gitAutoCommit');
        const provider = config.get('aiProvider', 'openai') as AIProviderType;
        const model = config.get('aiModel', 'gpt-4o-mini') as string;

        let apiKey = '';
        let apiUrl = '';
        let headers: any = {};
        let body: any = {};

        switch (provider) {
            case 'openai':
                apiKey = config.get('openaiApiKey', '') as string;
                apiUrl = 'https://api.openai.com/v1/chat/completions';
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                };
                body = {
                    model: model || 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that generates concise, meaningful git commit messages following conventional commit format. Keep messages short and focused.'
                        },
                        {
                            role: 'user',
                            content: `Generate a commit message for these changes:\n\nFiles changed:\n${files.join('\n')}\n\nDiff summary:\n${diff.substring(0, 1000)}`
                        }
                    ],
                    max_tokens: 150,
                    temperature: 0.7
                };
                break;

            case 'anthropic':
                apiKey = config.get('anthropicApiKey', '') as string;
                apiUrl = 'https://api.anthropic.com/v1/messages';
                headers = {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                };
                body = {
                    model: model || 'claude-3-5-sonnet-20241022',
                    max_tokens: 150,
                    messages: [
                        {
                            role: 'user',
                            content: `Generate a concise git commit message following conventional commit format for these changes:\n\nFiles changed:\n${files.join('\n')}\n\nDiff summary:\n${diff.substring(0, 1000)}\n\nRespond with ONLY the commit message, nothing else.`
                        }
                    ]
                };
                break;

            case 'gemini':
                apiKey = config.get('geminiApiKey', '') as string;
                apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-pro'}:generateContent?key=${apiKey}`;
                headers = {
                    'Content-Type': 'application/json'
                };
                body = {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Generate a concise git commit message following conventional commit format for these changes:\n\nFiles changed:\n${files.join('\n')}\n\nDiff summary:\n${diff.substring(0, 1000)}\n\nRespond with ONLY the commit message.`
                                }
                            ]
                        }
                    ]
                };
                break;

            case 'openrouter':
                apiKey = config.get('openrouterApiKey', '') as string;
                apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://github.com/yourusername/git-auto-commit',
                    'X-Title': 'Git Auto Commit'
                };
                body = {
                    model: model || 'anthropic/claude-3.5-sonnet',
                    messages: [
                        {
                            role: 'user',
                            content: `Generate a concise git commit message following conventional commit format for these changes:\n\nFiles changed:\n${files.join('\n')}\n\nDiff summary:\n${diff.substring(0, 1000)}`
                        }
                    ],
                    max_tokens: 150
                };
                break;
        }

        if (!apiKey) {
            throw new Error(`No API key configured for ${provider}. Please configure it in settings.`);
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} ${errorText}`);
            }

            const data: any = await response.json();
            let message = '';

            switch (provider) {
                case 'openai':
                case 'openrouter':
                    message = data.choices[0].message.content.trim();
                    break;
                case 'anthropic':
                    message = data.content[0].text.trim();
                    break;
                case 'gemini':
                    message = data.candidates[0].content.parts[0].text.trim();
                    break;
            }

            message = message.replace(/```\w*\n?/g, '').trim();
            return message;
        } catch (error) {
            throw new Error(`AI generation failed: ${error}`);
        }
    }

    static generateRuleBasedCommitMessage(files: string[], diff: string): string {
        const fileTypes = new Set<string>();
        const actions = new Set<string>();

        files.forEach(file => {
            const ext = file.split('.').pop()?.toLowerCase();
            if (ext) fileTypes.add(ext);

            if (file.includes('test')) actions.add('test');
            if (file.includes('config')) actions.add('config');
            if (file.includes('README') || file.includes('doc')) actions.add('docs');
        });

        let message = '';

        if (actions.has('test')) {
            message = 'test: update test files';
        } else if (actions.has('docs')) {
            message = 'docs: update documentation';
        } else if (actions.has('config')) {
            message = 'chore: update configuration';
        } else if (fileTypes.has('json') || fileTypes.has('yaml') || fileTypes.has('yml')) {
            message = 'chore: update data files';
        } else if (fileTypes.has('css') || fileTypes.has('scss') || fileTypes.has('less')) {
            message = 'style: update styles';
        } else if (fileTypes.has('ts') || fileTypes.has('js') || fileTypes.has('py') || fileTypes.has('java')) {
            message = `feat: update ${Array.from(fileTypes).join(', ')} files`;
        } else {
            message = `chore: update ${files.length} file${files.length > 1 ? 's' : ''}`;
        }

        if (files.length <= 3) {
            message += `\n\n${files.map(f => `- ${f}`).join('\n')}`;
        } else {
            message += `\n\n${files.slice(0, 3).map(f => `- ${f}`).join('\n')}\n- and ${files.length - 3} more...`;
        }

        return message;
    }
}
