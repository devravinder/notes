# Linux commands

## Viewing files

- `cat a.txt` full content
- `more a.txt` page by page, forward only
- `less a.txt` page by page, both directions
- `head -n 5 a.txt` top 5 lines
- `tail -n 5 a.txt` bottom 5 lines
- `history` all used commands
- `!2` execute 2nd command from history
- `whoami` active user

## System info

- `hostnamectl` OS version & details
- `dpkg --print-architecture` system arch (amd64, arm64)
- `lsb_release -a` or `cat /etc/*release` or `cat /etc/issue*` or `cat /proc/version`
- `uname -a` system name & arch
- `uname -m` arch type (amd or arm)
- `hostname -I` ip address

## Resource usage

- `du -sh folder_or_file` size (s-summary h-human readable)
- `lscpu | grep MHz` processor speed
- `top` running processes
- `df` disk space
- `sudo fdisk -l` all disk space
- `free -m` / `free -g` free ram in MB/GB
- `ps ux` all processes & command path
- `pidof programName` pid (may return multiple)

## Permissions

- `u` user, `g` group, `o` other, `a` all
- `chmod u=rwx fileName` set user read/write/execute
- `chmod g+w fileName` add group write
- `chmod o-x fileName` remove other execute
- `chmod -R o=rwx folder` recursive (uppercase `-R`)

## Symlinks

- `ln -sf path_to_source path_to_target` works for files and folders
- target shouldn't exist, else it's overridden (due to `-f`)
- if creation fails, try with `sudo`

## find / search

- `find / -name "hello.js"`
- `lsof -i -P -n | grep LISTEN` listening processes
- `rm -fr folder` force delete

## Custom domain

- add in `/etc/hosts` (prefer over `/etc/domain`)
  - eg: `127.0.0.1 ravinder.com`

## External hard disk (ntfs)

- check file system: `sudo blkid /dev/sda1`
- install utility if ntfs: `sudo apt-get install ntfs-3g`
- create folder: `sudo mkdir -p /home/ravinder/2.0TB`
- mount: `sudo mount -t ntfs-3g /dev/sda1 /home/ravinder/2.0TB`

## gsettings

- for GUI-less settings: `gsettings` or `dconf`
- ref: http://manpages.ubuntu.com/manpages/precise/en/man1/gsettings.1.html
