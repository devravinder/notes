# Software Installation and Uninstallation on Linux

This guide covers various methods for installing and uninstalling software on Debian-based Linux distributions like Ubuntu.

## General Installation Workflow

A typical setup after fresh Ubuntu install:

1. `Install Ubuntu`  
   - Follow official installation guide.

2. `Install Required Software`  
   - Use methods below to install essential applications.

3. `Set up Aliases`  
   - Configure shell aliases for productivity.

4. `Generate SSH Keys`  
   - Create keys for secure services like GitHub.

---

## Installation Methods

### Using apt with .deb files

Install downloaded packages:

```bash
sudo apt install ./package-name.deb
