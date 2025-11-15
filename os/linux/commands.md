# Linux Commands

This document provides a summary of various Linux commands and configurations.

## GUI and Display Management

### Switching Between GUI and TTY

-   Enable TTY (from GUI mode): `Ctrl + Alt + F4`
-   Enable GUI (from TTY mode): `Ctrl + Alt + F1`, `Ctrl + Alt + F2`, or `Ctrl + Alt + F7`

### GNOME Display Manager (GDM)

If you are unable to enter GUI mode, the GNOME Display Manager (GDM) might have crashed.

-   **Check GDM status:**
    ```bash
    sudo systemctl status gdm3.service
    ```
-   **Reinstall GDM and Ubuntu Desktop:**
    ```bash
    sudo apt install --reinstall ubuntu-desktop gdm3
    ```
-   **Start GDM:**
    ```bash
    sudo systemctl start gdm3.service
    ```

### Wayland Configuration

If you are unable to share your screen through a browser (like Chrome), you may need to disable Wayland.

1.  Edit the GDM custom configuration file:
    ```bash
    sudo nano /etc/gdm3/custom.conf
    ```
2.  Uncomment the following line to disable Wayland:
    ```
    WaylandEnable=false
    ```

### Enable GUI App Opening from CLI

To enable opening a GUI application from the command line, you might need to set the `DISPLAY` variable:

```bash
export DISPLAY=:1
```

## System Information

-   **Get IP Address:**
    ```bash
    hostname -I
    ```
-   **Get Active User:**
    ```bash
    whoami
    ```
-   **View OS Version and Details:**
    ```bash
    hostnamectl
    ```
-   **View Linux Distribution Details:**
    ```bash
    lsb_release -a
    # or
    cat /etc/*release
    # or
    cat /etc/issue*
    # or
    cat /proc/version
    ```
-   **Check System Architecture (e.g., amd64, arm64):**
    ```bash
    uname -m
    # or
    dpkg --print-architecture
    ```
-   **Get System Name and Architecture Type:**
    ```bash
    uname -a
    ```
-   **View Processor Speed:**
    ```bash
    lscpu | grep MHz
    ```

## File and Directory Management

-   **View File Content:**
    -   `cat a.txt`: Display the full content of a file.
    -   `more a.txt`: View content page by page (forward direction only).
    -   `less a.txt`: View content page by page (both forward and backward).
    -   `head -n 5 a.txt`: View the top 5 lines of a file.
    -   `tail -n 5 a.txt`: View the bottom 5 lines of a file.
-   **Get Size of a File or Folder:**
    ```bash
    du -sh <folder_or_file_name>
    ```
    -   `-s`: Summary
    -   `-h`: Human-readable format

### File Permissions

-   **Change file permissions:**
    ```bash
    chmod u=rwx,g=rx,o=r <file_name>
    ```
    -   `u`: user, `g`: group, `o`: other, `a`: all
    -   `r`: read, `w`: write, `x`: execute
    -   `+`: add permission, `-`: remove permission
-   **Examples:**
    ```bash
    chmod u+x fileName
    chmod g-w fileName
    chmod o-x fileName
    chmod -R o=rwx folderName # -R for recursive
    ```

### Symbolic Links (Symlinks)

Create a symbolic link (shortcut) to a file or directory.

```bash
ln -sf /path/to/source /path/to/target
```

-   `-s`: Creates a symbolic link.
-   `-f`: Forces the creation, overwriting the target if it already exists.
-   If you encounter issues, try running the command with `sudo`.

## Process Management

-   **View All Running Processes:**
    ```bash
    top
    ```
-   **View All Processes with Command Path:**
    ```bash
    ps ux
    ```
-   **Get Process ID (PID) of a Program:**
    ```bash
    pidof <programName>
    ```

## Disk and Memory

-   **View Disk Space Usage:**
    ```bash
    df
    ```
-   **View All Disk Partitions and Space:**
    ```bash
    sudo fdisk -l
    ```
-   **View Free RAM:**
    ```bash
    free -m # in Megabytes
    free -g # in Gigabytes
    ```

## Command History

-   **View Command History:**
    ```bash
    history
    ```
-   **Execute a Command from History (e.g., the 2nd command):**
    ```bash
    !2
    ```

## Environment Variables

1.  **Open the environment file:**
    ```bash
    sudo nano /etc/environment
    ```
2.  **Add or modify variables.** For system path variables, append to the existing `PATH` line. For other variables, add them on a new line.
3.  **Reload the environment:**
    ```bash
    source /etc/environment
    ```

## Custom Domain Mapping

You can map custom domain names to your local machine for development.

1.  **Edit the hosts file:**
    ```bash
    sudo nano /etc/hosts
    ```
2.  **Add entries:**
    ```
    127.0.0.1   localhost
    127.0.0.1   mydomain.com
    127.0.0.1   project.local
    ```

## Screenshots and Screen Recording

-   **Screenshot Desktop:** `PrtScrn`
-   **Screenshot Window:** `Alt + PrtScrn`
-   **Screenshot Selected Area:** `Shift + PrtScrn`
-   **Start/Stop Screen Recording:** `Ctrl + Alt + Shift + R`
    -   Screenshots are typically saved in the `Pictures` folder.
    -   Screen recordings are typically saved in the `Videos` folder.

## Special Characters (Unicode)

-   You can find unicode characters at [unicode.org](https://unicode.org/emoji/charts/full-emoji-list.html).
-   To insert a unicode character, press `Ctrl+Shift+U`, then type the code (e.g., `00B0` for the degree symbol) and press `Enter`.

## USB Partition Management with gParted

`gParted` is a default partition editor in Ubuntu.

1.  Open `gParted`.
2.  Select your USB drive (e.g., `/dev/sda`) from the dropdown.
3.  Delete any existing partitions and apply the changes.
4.  Create a new single partition (e.g., FAT32) using the full available volume.
-   **Note:** If the USB drive doesn't appear, open the "Disks" application, select the drive, and click the "mount" (play) button.
