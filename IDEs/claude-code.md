# Claude Code

Claude Code is Anthropic's official CLI for Claude — an agentic coding tool that runs in the terminal.

## Prerequisites

- Node.js 18 or newer
- A Claude.ai or Anthropic Console account (for authentication)

## Install

```bash
npm install -g @anthropic-ai/claude-code
```

## Verify install

```bash
claude --version
```

## First run

Run `claude` inside a project directory to start an interactive session:

```bash
cd /path/to/project
claude
```

On first launch it opens a browser window to authenticate with your Anthropic account.

## Update

```bash
npm update -g @anthropic-ai/claude-code
```

## Uninstall

```bash
npm uninstall -g @anthropic-ai/claude-code
```

## Useful commands

| Command | Description |
|---|---|
| `claude` | Start an interactive session in the current directory |
| `claude --version` | Print the installed version |
| `claude /help` | Show in-session help |
| `claude mcp` | Manage MCP server connections |
| `/config` | Configure settings (theme, model, etc.) from within a session |
