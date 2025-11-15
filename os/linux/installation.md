# Software Installation and Uninstallation on Linux

This guide covers various methods for installing and uninstalling software on Debian-based Linux distributions like Ubuntu.

## General Installation Workflow

A typical setup process after a fresh Ubuntu installation involves:

1.  **Install Ubuntu**: Follow the official installation guide.
2.  **Install Required Software**: Use the methods described below to install your essential applications.
3.  **Set up Aliases**: Configure your shell aliases for productivity.
4.  **Generate SSH Keys**: Create SSH keys for secure connections to services like GitHub.

## Installation Methods

### Using `apt` with `.deb` files

You can install downloaded `.deb` packages directly using `apt`.

```bash
sudo apt install ./package-name.deb
```

### From a `.run` file

`.run` files are executable installers.

1.  **Make the file executable**:
    ```bash
    chmod +x file.run
    ```
2.  **Execute the installer**:
    ```bash
    ./file.run
    ```

### From a `tar.gz` archive (Source Code)

This method involves compiling the software from its source code.

1.  **Unpack the archive**:
    ```bash
    tar -zxvf file.tar.gz
    ```
2.  **Navigate into the new directory**:
    ```bash
    cd extracted-folder
    ```
3.  **Follow the standard build process**. Look for a `README` or `INSTALL` file for specific instructions. The typical commands are:
    ```bash
    ./configure
    make
    sudo make install
    ```
-   **Alternative**: If the build process fails or is not provided, you can often move the extracted application folder to `/opt/` and create a manual desktop entry for it (see `system_administration.md`).

## Uninstallation

### Finding Installed Packages

-   **List all `apt` installed packages**:
    ```bash
    sudo apt list --installed
    ```
-   **List all `snap` installed packages**:
    ```bash
    snap list
    ```
-   **Search for a specific package**:
    ```bash
    sudo apt list --installed | grep -i "keyword"
    ```
-   **Find application launchers**: Most installed applications will have a `.desktop` file in `/usr/share/applications/` or `~/.local/share/applications/`.

### Removing Packages

-   **Using `apt`**:
    -   `sudo apt remove package_name`: Removes the package but keeps configuration files.
    -   `sudo apt purge package_name`: Removes the package and all its configuration files.
-   **Using `snap`**:
    ```bash
    sudo snap remove package_name
    ```
-   **Using `dpkg`** (another low-level package manager):
    ```bash
    sudo dpkg -r package_name # Remove
    sudo dpkg -r --force-all package_name # Force remove
    ```
