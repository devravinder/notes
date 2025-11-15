# Linux Software Guide

This document provides a list of useful software for Linux, along with installation notes and usage instructions.

## Default Software (Core Utilities)

These tools are typically available in a standard Linux installation.

-   **`update-alternatives`**: Manages multiple versions of the same software. This is useful when you need to switch between different versions of tools like Java, Python, etc.
    -   **References**:
        -   [man page](https://man7.org/linux/man-pages/man1/update-alternatives.1.html)
        -   [Baeldung Tutorial](https://www.baeldung.com/linux/update-alternatives-command)
    -   **General Workflow**:
        1.  Install the required software versions.
        2.  Add each version to `update-alternatives`.
        3.  Configure which version to use.
        4.  Test the setup.
    -   **Example: Managing Multiple JDKs**
        1.  **Install JDKs**:
            ```bash
            sudo apt update
            sudo apt install openjdk-8-jdk -y
            sudo apt install openjdk-17-jdk -y
            ```
        2.  **Add alternatives for `java` and related commands**: The last number is the priority.
            ```bash
            # Syntax: sudo update-alternatives --install <link> <name> <path> <priority>
            sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/bin/java 800
            sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1700
            
            sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac 800
            sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-17-openjdk-amd64/bin/javac 1700
            ```
        3.  **Configure the desired version**: This will present an interactive prompt to select the default version.
            ```bash
            sudo update-alternatives --config java
            sudo update-alternatives --config javac
            ```
        4.  **Verify the installation**:
            ```bash
            java -version
            javac -version
            ```
-   **`whereis`**: Finds the binary, source, and manual page files for a command.
-   **`man`**: Displays the manual page (documentation) for a command.
-   **`ln`**: Creates links between files (see `commands.md` for more details).
-   **`wget`**: A non-interactive tool for downloading files from the web.
-   **`tar`**: A tool for creating and extracting archive files (`.tar`, `.tar.gz`, etc.).

## External Software

This is a list of recommended external software.

### Development Tools

-   **Git**: Distributed version control system.
-   **SDKMAN**: A command-line tool for managing parallel versions of multiple Software Development Kits (e.g., Java, Groovy, Scala).
-   **nvm**: Node Version Manager for managing multiple Node.js versions.
-   **pnpm**: A fast and disk-space-efficient package manager for Node.js.
-   **Bun**: A fast, all-in-one JavaScript toolkit.
-   **Go**: The Go programming language. (Remember to add its `bin` path to `/etc/environment`).
-   **Docker**: A platform for developing, shipping, and running applications in containers.
-   **Taskfile**: A simple and easy-to-use task runner/build tool. See [taskfile.dev](https://taskfile.dev/installation/) for installation.

### IDEs and Editors

-   **Visual Studio Code (VSC)**: A lightweight but powerful source code editor.
-   **IntelliJ IDEA**: A powerful IDE for Java and other JVM languages. (Remember to create a desktop entry).

### API and Database Tools

-   **Postman**: A platform for building and using APIs. (Remember to create a desktop entry).
-   **DBeaver**: A universal database tool that supports many different databases.
-   **MongoDB Compass**: A GUI for MongoDB.
-   **redis-tools**: (Optional) Provides the command-line interface for a Redis server.

### Kubernetes and Cloud-Native

-   **Kind**: A tool for running local Kubernetes clusters using Docker containers. It's a Go package, so ensure its `bin` folder is in your system's `PATH`.
-   **kubectl**: The command-line tool for interacting with Kubernetes clusters.
-   **Lens (k8slens)**: A powerful IDE for Kubernetes. It can be installed from the Snap Store.
-   **Helm**: The package manager for Kubernetes. The `helm-classic` package can be installed with Snap.

### Browsers and Productivity

-   **Chrome**: Web browser.
-   **Brave**: A privacy-focused web browser.
-   **Remmina**: A remote desktop client for various protocols (RDP, VNC, SSH).
-   **Diodon**: A lightweight clipboard manager.
-   **LibreOffice**: A free and open-source office suite. Install with `apt`.
-   **VLC**: A versatile media player. Install with Snap.

### System Utilities

-   **tmux**: A terminal multiplexer that allows you to manage multiple terminal sessions in the background.
-   **UxPlay**: A tool for screen mirroring from mobile devices to your Linux desktop.
    -   Start server: `$ uxplay`
    -   Start with a custom server name: `$ uxplay -n "My Laptop"`
    -   Set resolution: `$ uxplay -s 1920x1080`
    -   **Important**: If mirroring fails, restart the service with `sudo pkill uxplay` before launching it again.
-   **GNOME Shell Extension Manager**: A GUI tool to browse and install GNOME Shell extensions.

### AI Command-Line Interfaces

-   **Codex (ChatGPT CLI)**:
    ```bash
    pnpm add -g @openai/codex
    ```
-   **Gemini CLI**:
    ```bash
    pnpm add -g @google/gemini-cli
    ```
