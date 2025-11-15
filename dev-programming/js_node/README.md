# JavaScript and Node.js Development Notes

This document contains a collection of notes, commands, and recommended libraries for JavaScript and Node.js development.

## Managing Node.js Versions with NVM

`nvm` (Node Version Manager) is a script that allows you to manage multiple active Node.js versions on the same machine.

### Installation

1.  **Install nvm**:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    Follow the instructions on-screen, which will likely involve sourcing a script in your shell profile.

### Usage

-   **Install a specific version of Node.js**:
    ```bash
    nvm install 20
    nvm install 18
    ```

-   **Switch to a specific version** in the current shell:
    ```bash
    nvm use 20
    ```

-   **Set a default version** for all new shells:
    ```bash
    nvm alias default 20
    ```

-   **List all installed versions**:
    ```bash
    nvm ls
    ```

## Useful Tools and Commands

-   **`npm-check-updates`**: A utility to upgrade your `package.json` dependencies to the latest versions.
    1.  Install it globally: `npm i -g npm-check-updates`
    2.  Run it in your project directory: `ncu -u`
    3.  Install the updated packages: `npm install`

-   **`unimported`**: A tool to find and clean up unused files and dependencies in your project.
    ```bash
    npx unimported
    ```

-   **`localtunnel`**: An alternative to `ngrok` for exposing your local server to the internet.

## Troubleshooting

### `npx` command not working

If you encounter an error like `npm ERR! Could not install from "..." as it does not contain a package.json file`, it might be because your npm cache path contains spaces.

1.  **Check your npm configuration**:
    ```bash
    npm config list
    ```
    Look for the `prefix` or `cache` path. If it contains spaces (e.g., `C:\Program Files\...`), you need to update it.

2.  **Set the path using the 8.3 short name format** (for Windows):
    In place of a space in a directory name like `Program Files`, use `Progra~1`.
    ```bash
    npm config set cache "C:\\Progra~1\\Git\\home\\ravinder \\.npm-global"
    ```

## Recommended Libraries

This is a list of commonly used libraries and tools in the JavaScript ecosystem.

### Node.js (Backend)

-   **`express`**: Fast, unopinionated, minimalist web framework.
-   **`multer`**: Middleware for handling `multipart/form-data`, primarily used for uploading files.
-   **`mongoose`**: Elegant MongoDB object modeling for Node.js.
-   **`sequelize` / `prisma`**: Modern ORMs for Node.js and TypeScript.
-   **`bcrypt`**: A library for hashing passwords.
-   **`puppeteer`**: A Node.js library for controlling a headless Chrome or Chromium browser.
-   **`xlsx`**: A library for reading, writing, and manipulating spreadsheet files.

### React (Frontend)

-   **`axios`**: Promise-based HTTP client for the browser and Node.js.
-   **`react-hook-form` / `formik`**: Libraries for building and managing forms.
-   **`joi` / `zod`**: Schema description and data validation libraries.
-   **`redux` / `redux-toolkit`**: State management libraries.
-   **`react-use`**: A collection of essential React Hooks.
-   **`serve`**: A simple tool for serving static sites.
-   **`radix-ui` & `shadcn/ui`**: Accessible, unstyled UI component primitives.
-   **`tanstack/react-query` & `tanstack/react-table`**: Libraries for data fetching, caching, and building powerful tables.

### Tooling and Configuration

-   **`pnpm`**: A fast, disk space-efficient package manager.
-   **`husky`**: A tool for running scripts at different stages of the git lifecycle (e.g., pre-commit).
-   **`prettier`**: An opinionated code formatter.
-   **`eslint`**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
-   **`commit-lint`**: A tool to lint your commit messages.
