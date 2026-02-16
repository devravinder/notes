# Linux System Administration

This guide covers system administration topics including OS re-installation, remote access, and service management.

## Re-installing Ubuntu

### Pre-installation Checklist

Back up the following:

- `Important Files`  
  - Personal files, documents, critical data

- `Configuration`  
  - `.bashrc`, `.zshrc`, app settings

- `Project / Code Folders`  
  - Development work

- `Installed Software List`  
  - Keep track for re-installation

---

### Post-installation Steps

1. `Install Essential Software`

   - `Chrome`
   - `curl`

     ```bash
     sudo apt install curl
     ```

   - `Git`

     ```bash
     sudo apt install git
     ```

   - `VSC`
     - Install from Snap Store or `.deb`

   - `Node.js & npm`

     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     nvm install --lts
     ```

   - `JDK`

     ```bash
     sudo apt install openjdk-17-jdk
     ```

   - `Other Software`
     - DBeaver, Postman, VLC, etc.

2. `Restore Configuration`

   - Copy `.bash_aliases`
   - Restore app settings

3. `Set up Desktop Entries`

Create file:

```bash
   sudo nano /usr/share/applications/postman.desktop
  [Desktop Entry]
  Categories=Development;
  Comment=Supercharge your API workflow
  Exec="/home/ravinder/Soft/Postman/app/Postman"
  Icon=/home/ravinder/Soft/Postman/app/resources/app/assets/icon.png
  Name=Postman
  Terminal=false
  Type=Application
  Version=1.0
```
