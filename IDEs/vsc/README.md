# Visual Studio Code Notes

This document contains a collection of notes, recommended extensions, keyboard shortcuts, and configuration examples for Visual Studio Code.

## Recommended Extensions

- **GitLens**: Supercharges the Git capabilities built into VS Code.
- **Bundle Size**: Shows the size of the focused file in the status bar.
- **Docker**: Adds syntax highlighting, commands, and more for Dockerfiles and `docker-compose` files.
- **Emoji**: Provides emoji syntax highlighting and autocomplete.
- **ES7+ React/Redux/React-Native snippets**: Provides JavaScript and React/Redux snippets in ES7+.
- **ESLint**: Integrates ESLint into VS Code.
- **GitHub Copilot**: AI-powered code completion and suggestion tool.
- **Markdown Preview Mermaid Support**: Adds Mermaid diagram rendering to the VS Code Markdown preview.
- **Pretty TypeScript**: Formats TypeScript code.
- **Prisma**: Adds syntax highlighting, formatting, and autocompletion for Prisma schemas.
- **Protobuf**: Provides Protobuf language support.
- **Sass IntelliSense**: Advanced autocompletion for Sass.
- **SVG**: A powerful tool for working with SVG.
- **Tailwind CSS IntelliSense**: Enhances the Tailwind development experience with advanced features.
- **YAML**: Provides YAML language support.
- **shell-format**: A formatter for shell scripts.
- **Terraform**: Adds syntax highlighting and other features for Terraform.
- **Terraform Doc Snippets**: Provides documentation snippets for Terraform.
- **Markdown Lint**: Lint for markdown files
  - add the below code in setting.json to work code blocks properly in markdown

    ```json
        "markdownlint.config": {
        "MD046": { "style": "fenced" }
       }
    ```

## Keyboard Shortcuts

### General

| Shortcut | Action |
| :--- | :--- |
| `F1` or `Ctrl+Shift+P` | **Command Palette**: Access all available commands. |
| `Ctrl+P` | **Quick Open**: Go to any file by name. |
| `Ctrl+,` | Open Settings. |
| `Ctrl+K, Ctrl+S` | Open Keyboard Shortcuts. |
| `Ctrl+\` | Toggle integrated terminal. |
| `Ctrl+W` | Close the current window/tab. |
| `Ctrl+K, Ctrl+W` | Close all windows/tabs. |

### Editing

| Shortcut | Action |
| :--- | :--- |
| `Alt + Up/Down Arrow` | Move the current line up or down. |
| `Ctrl+Shift+K` | Delete the current line. |
| `Ctrl+Enter` | Insert a new line below the current line. |
| `Ctrl+Shift+Enter` | Insert a new line above the current line. |
| `Ctrl+Shift+\` | Jump to the matching bracket. |
| `Ctrl+/` | Toggle line comment. |
| `Shift+Alt+A` | Toggle block comment. |
| `Alt+Z` | Toggle word wrap. |
| `Ctrl+Shift+I` | Format the document. |
| `Ctrl+U` | Undo the last cursor operation. |
| `Home` / `End` | Go to the beginning/end of the current line. |
| `Ctrl+Home` / `Ctrl+End` | Go to the beginning/end of the file. |

### Navigation

| Shortcut | Action |
| :--- | :--- |
| `Ctrl+G` | Go to a specific line number. |
| `Ctrl+T` | Show all symbols in the current file. |
| `F12` | Go to Definition of a symbol. |
| `Alt+Shift+O` | Organize/remove unused imports. |

### Search

| Shortcut | Action |
| :--- | :--- |
| `Ctrl+F` | Find in the current file. |
| `Ctrl+H` | Replace in the current file. |
| `Ctrl+Shift+F` | Find in all files across the project. |

## Debugging (`launch.json`)

The `.vscode/launch.json` file is used to configure the debugger in Visual Studio Code. Below are some example configurations.

### Attach to a Node.js Process in a Docker Container

This configuration attaches the VS Code debugger to a Node.js application running inside a Docker container that has been started with the `--inspect=0.0.0.0:9229` flag.

```json
{
    "type": "node",
    "request": "attach",
    "name": "Docker: Attach to Node",
    "address": "0.0.0.0",
    "port": 9229,
    "remoteRoot": "/app",
    "localRoot": "${workspaceFolder}/path/to/your/project",
    "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
    ]
}
```

### Launch a Single Node.js File

This configuration launches and debugs a single JavaScript file.

```json
{
    "name": "Launch Single File",
    "type": "pwa-node",
    "request": "launch",
    "program": "${workspaceFolder}/path/to/your/file.js",
    "cwd": "${workspaceFolder}/path/to/your",
    "skipFiles": [
        "<node_internals>/**"
    ]
}
```

### Launch a Node.js Project

This configuration launches a full Node.js project by specifying the entry point (e.g., `bin/www` for an Express app).

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Project",
    "program": "${workspaceFolder}/path/to/project/entrypoint.js",
    "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
    ]
}
```

### Launch a TypeScript Project

This configuration first runs a `preLaunchTask` to compile the TypeScript code and then launches the compiled JavaScript output.

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch TypeScript Project",
    "program": "${workspaceFolder}/path/to/project/src/start.ts",
    "preLaunchTask": "tsc: build - tsconfig.json",
    "outFiles": ["${workspaceFolder}/path/to/project/dist/**/*.js"],
    "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
    ]
}
```

You will need to have a corresponding task defined in your `.vscode/tasks.json` file for the `preLaunchTask` to work.
