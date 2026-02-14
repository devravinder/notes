# Linux Commands

This document provides a summary of various Linux commands and configurations.

## GUI and Display Management

### Switching Between GUI and TTY

- Enable TTY (from GUI mode): `Ctrl + Alt + F4`
- Enable GUI (from TTY mode): `Ctrl + Alt + F1`, `Ctrl + Alt + F2`, or `Ctrl + Alt + F7`

### GNOME Display Manager (GDM)

If you are unable to enter GUI mode, the GNOME Display Manager (GDM) might have crashed.

- Check GDM status:

    ```bash
    sudo systemctl status gdm3.service
    ```

- Reinstall GDM and Ubuntu Desktop:

    ```bash
    sudo apt install --reinstall ubuntu-desktop gdm3
    ```

- Start GDM:

    ```bash
    sudo systemctl start gdm3.service
    ```

### Wayland Configuration

If you are unable to share your screen through a browser (like Chrome), you may need to disable Wayland.

1. Edit GDM configuration:

    ```bash
    sudo nano /etc/gdm3/custom.conf
    ```

2. Disable Wayland:

    ```bash
    WaylandEnable=false
    ```

### Enable GUI App Opening from CLI

Set display variable:

```bash
export DISPLAY=:1
```
