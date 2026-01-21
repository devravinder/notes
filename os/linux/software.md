# Linux Software Guide

This document provides a list of useful software for Linux, along with installation notes and usage instructions.

## Default Software (Core Utilities)

These tools are typically available in a standard Linux installation.

- `update-alternatives`: Manages multiple versions of the same software.  
  Useful for switching between different versions of tools like Java, Python, etc.

  - `References`:
    - [man page](https://man7.org/linux/man-pages/man1/update-alternatives.1.html)
    - [Baeldung Tutorial](https://www.baeldung.com/linux/update-alternatives-command)

  - `General Workflow`:
    1. Install the required software versions.
    2. Add each version to `update-alternatives`.
    3. Configure which version to use.
    4. Test the setup.

  - `Example: Managing Multiple JDKs`

    1. `Install JDKs`

        ```bash
        sudo apt update
        sudo apt install openjdk-8-jdk -y
        sudo apt install openjdk-17-jdk -y
        ```

    2. `Add alternatives for java and related commands`  
       (Last number = priority)

        ```bash
        # Syntax:
        # sudo update-alternatives --install <link> <name> <path> <priority>

        sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/bin/java 800
        sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1700

        sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac 800
        sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-17-openjdk-amd64/bin/javac 1700
        ```

    3. `Configure desired version`

        ```bash
        sudo update-alternatives --config java
        sudo update-alternatives --config javac
        ```

    4. `Verify installation`

        ```bash
        java -version
        javac -version
        ```

- `whereis`: Finds binary, source, and man page files.
- `man`: Displays command documentation.
- `ln`: Creates links between files.
- `wget`: Downloads files from the web.
- `tar`: Creates and extracts archive files (`.tar`, `.tar.gz`, etc.).

---

## External Software

### Development Tools

- `Git`: Distributed version control system.
- `SDKMAN`: Manage multiple SDK versions (Java, Groovy, Scala, etc.).
- `nvm`: Node Version Manager.
- `pnpm`: Fast Node.js package manager.
- `Bun`: All-in-one JavaScript toolkit.
- `Go`: Programming language  
  - Remember to add its `bin` path to `/etc/environment`
- `Docker`: Container platform.
- `Taskfile`: Task runner  
  - [Instllation](https://taskfile.dev/installation/)
- `gitc` : to copy files from github repo
  - my own npm lib

### IDEs and Editors

- `Visual Studio Code`
- `IntelliJ IDEA`
  - Remember to create a desktop entry

### API and Database Tools

- `Postman`
- `DBeaver`
- `MongoDB Compass`
- `redis-tools`

### Kubernetes and Cloud-Native

- `Kind`
- `kubectl`
- `Lens (k8slens)`
- `Helm`

### Browsers and Productivity

- `Chrome`
- `Brave`
- `Remmina`
- `Diodon`
- `LibreOffice`
- `VLC`

### System Utilities

- `tmux`
- `UxPlay`

  - Start server:

    ```bash
    uxplay
    ```

  - Custom name:

    ```bash
    uxplay -n "My Laptop"
    ```

  - Set resolution:

    ```bash
    uxplay -s 1920x1080
    ```

  - Important:

    ```bash
    sudo pkill uxplay
    ```

- `GNOME Shell Extension Manager`
- `ydl-dp`
  - Install via apt

### AI Command-Line Interfaces

- `Codex (ChatGPT CLI)`

    ```bash
    pnpm add -g @openai/codex
    ```

- `Gemini CLI`

    ```bash
    pnpm add -g @google/gemini-cli
    ```
