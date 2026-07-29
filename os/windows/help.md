# Windows

## Git in windows

- download git bash
- generate ssh key: `ssh-keygen -t rsa`, enter & remember passphrase
- it shows where the files are created, open with notepad: `notepad C:\Users\Durvah01/.ssh/id_rsa.pub`
- copy content, paste in git provider's ssh keys settings
- pull the repo, it'll ask passphrase, enter and validate

## Connecting linux with putty

- get `.pem` file (eg from AWS EC2 linux)
- convert `.pem` to `.ppk`: open PuttyGen -> load the file -> save private key (without passphrase)
- Putty configuration
  - Session: `user@host`, select SSH
  - SSH > Auth: browse `.ppk` file -> open

## WinSCP to linux

- open WinSCP, new site
- enter host (default port 22), username, no password
- Advanced Settings > Authentication > SSH: browse `.ppk` file (convert `.pem` to `.ppk` first)

## Dual install ubuntu alongside windows

- `@R` = right click
- before installing, in windows
  1. disable RST if enabled (or from BIOS)
  2. disable BitLocker if enabled (only from windows)
- make free disk space: This PC `@R` -> Manage > Manage Disk Space -> create partition, then delete it (frees the space)
- boot linux from a bootable device (not just bootable files - a bootable device gives install options)
- installing
  - prefer "install along with windows" if offered
  - else choose "something else" and follow:
    1. select the free space made earlier
    2. `+` -> size: 2x RAM, use as: swap area
    3. `+` -> size: remaining, use as: Ext4 journaling file system, mount point: `/`
    4. click install

## Closing a process

- find port/process: `netstat -a -n -o | findstr 3000` (get PID)
- `taskkill /PID 3000`
