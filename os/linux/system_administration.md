# Linux System Administration

This guide covers topics related to system administration, including OS re-installation, remote access, and service management.

## Re-installing Ubuntu

### Pre-installation Checklist

Before you re-install, make sure to back up the following:

-   **Important Files**: Your personal files, documents, and any other critical data.
-   **Configuration**: Your shell aliases (`.bashrc`, `.zshrc`), application settings, etc.
-   **Project/Code Folders**: Any development work.
-   **List of Installed Software**: Note down the software you regularly use to re-install it later.

### Post-installation Steps

1.  **Install Essential Software**:
    -   **Chrome**: Web browser.
    -   **curl**: `sudo apt install curl`
    -   **Git**: `sudo apt install git`
    -   **VSC**: Install from the Snap Store or official `.deb` package.
    -   **Node.js & npm**:
        ```bash
        # Use nvm (Node Version Manager) for better flexibility
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        # Reload shell and install desired Node.js version
        nvm install --lts
        ```
    -   **JDK (Java)**:
        ```bash
        # Install a specific version
        sudo apt install openjdk-17-jdk
        # Use `update-alternatives` to manage multiple versions (see software.md)
        ```
    -   **Other Software**: DBeaver, Postman, VLC, etc.

2.  **Restore Configuration**:
    -   Copy your backed-up alias files (e.g., `.bash_aliases`) to your home directory.
    -   Restore any other application settings.

3.  **Set up Desktop Entries**:
    For applications that don't create a desktop entry automatically (like Eclipse/STS), you can create a `.desktop` file in `/usr/share/applications/`.

    **Example for STS (Spring Tool Suite)**:
    Create a file named `sts.desktop` with the following content:
    ```ini
    [Desktop Entry]
    Type=Application
    Name=STS
    Comment=Spring Tool Suite
    Icon=/path/to/your/sts/icon.xpm
    Exec=/path/to/your/sts/STS
    Terminal=false
    Categories=Development;IDE;Java;
    ```

## Remote Access

### SSH (Secure Shell)

#### Setting up an SSH Server

To allow remote connections to your machine, you need to install and run an SSH server.

1.  **Install OpenSSH Server**:
    ```bash
    sudo apt-get install openssh-server
    ```
2.  **Check the service status**:
    ```bash
    sudo systemctl status ssh
    ```

#### Passwordless Authentication (Key-based)

1.  **Generate an SSH Key Pair** on your **local** machine:
    ```bash
    ssh-keygen -t rsa -b 4096
    ```
    This creates a private key (`id_rsa`) and a public key (`id_rsa.pub`) in your `~/.ssh` directory.

2.  **Copy the Public Key to the Remote Server**:
    You can do this automatically with `ssh-copy-id`:
    ```bash
    ssh-copy-id user@remote_host
    ```
    Or manually by appending the content of your `~/.ssh/id_rsa.pub` to the `~/.ssh/authorized_keys` file on the remote server.

3.  **(Optional) Disable Password Authentication**: For better security, you can disable password logins on the remote server by editing `/etc/ssh/sshd_config` and setting `PasswordAuthentication no`. Restart the SSH service afterward (`sudo systemctl restart ssh`).

#### Managing Multiple SSH Keys

If you have multiple SSH keys, you can use `ssh-add` to add them to the SSH agent.

```bash
# Start the agent in the background
eval `ssh-agent -s`

# Add your key
ssh-add ~/.ssh/your_private_key
```

### SCP (Secure Copy)

Use `scp` to securely transfer files between your local machine and a remote server.

-   **Local to Remote**:
    ```bash
    scp -i /path/to/key.pem /local/file/path user@remote_host:/remote/dir/
    ```
-   **Remote to Local**:
    ```bash
    scp -i /path/to/key.pem user@remote_host:/remote/file/path /local/dir/
    ```

### Connecting with FileZilla (SFTP)

1.  Go to `Edit > Settings > SFTP`.
2.  Click "Add key file..." and select your private key (`.pem` or `id_rsa`).
3.  Go to `File > Site Manager` and create a new site.
4.  **Protocol**: `SFTP - SSH File Transfer Protocol`
5.  **Host**: The remote server's IP address or hostname.
6.  **Logon Type**: `Key file`
7.  **User**: Your remote username.
8.  **Key file**: Browse and select your private key file.

## Connecting to Linux from Windows (Xrdp)

You can use the Remote Desktop Protocol (RDP) to get a full graphical desktop session on your Linux machine from Windows.

1.  **Install Xrdp** on your Linux machine:
    ```bash
    sudo apt install xrdp
    ```
2.  **Allow the RDP port** through the firewall:
    ```bash
    sudo ufw allow 3389
    ```
3.  **Add your user to the `ssl-cert` group**:
    ```bash
    sudo adduser your_user ssl-cert
    ```
4.  **Restart the Xrdp service**:
    ```bash
    sudo systemctl restart xrdp
    ```
-   **Note**: Xrdp typically does not allow a user to be logged in both locally and remotely at the same time. If you see a blank screen when connecting, make sure you are logged out of the local session on the Linux machine. It's often best to create a dedicated user for RDP connections.

## Creating a Systemd Service

To run an application as a background service that starts on boot, you can create a `systemd` service file.

1.  **Create a service file**:
    ```bash
    sudo nano /etc/systemd/system/myapp.service
    ```
2.  **Add the service configuration**:

    ```ini
    [Unit]
    Description=My Awesome App

    [Service]
    # The command to start the application
    ExecStart=/path/to/your/application/executable
    
    # The user to run the service as
    User=your_user
    
    # Restart the service if it fails
    Restart=on-failure

    [Install]
    # Start the service at boot
    WantedBy=multi-user.target
    ```

3.  **Reload the systemd daemon, enable, and start the service**:
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable myapp.service # Enable on boot
    sudo systemctl start myapp.service  # Start now
    sudo systemctl status myapp.service # Check status
    ```

## Timezone Configuration

-   **List available timezones**:
    ```bash
    timedatectl list-timezones
    ```
-   **Set your timezone**:
    ```bash
    sudo timedatectl set-timezone 'Asia/Kolkata'
    ```
-   **Verify the change**:
    ```bash
    date
    ```
