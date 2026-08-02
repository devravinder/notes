# Linux system administration

## Enable/disable GUI

- enable TTY: `ctrl + alt + f4` (from GUI mode)
- enable GUI: `ctrl + alt + f1/f2/f7` (from TTY mode)
- if unable to enter GUI mode, GDM (Gnome Display Manager) may have crashed
  - check status: `sudo systemctl status gdm3.service`
  - reinstall: `sudo apt install --reinstall ubuntu-desktop gdm3`
  - start: `sudo systemctl start gdm3.service`
  - then re-enter GUI mode

## Firewall Enable/Disable PORT

- check status: `sudo ufw status`
- Enable : `sudo ufw enable`
- reload : `sudo ufw reload`
- see rules: `sudo ufw status numbered`
- allow port: `sudo ufw allow 1025` or ``sudo ufw allow 1025/tcp`
- allow port range: `sudo ufw allow 8000:8100/tcp`

## Wayland (screen share fix)

- if unable to share screen through browser (chrome): `sudo nano /etc/gdm3/custom.conf`
- uncomment `#WaylandEnable=false` to `WaylandEnable=false`

## Open GUI app from CLI

- `export DISPLAY=:1`

## Environment variables

- open `/etc/environment`
- add variable
  - system path variable: append to existing line
  - specific variable: add in new line
- reload: `source /etc/environment`

## Screenshot & screen record

- `prntScrn` screenshot desktop
- `alt+prntScrn` screenshot window
- `shift+prntScr` screenshot selected area (saved in pictures folder or home)
- `ctrl+alt+shift+R` start/stop screen record (saved in videos or home folder)

## Combining USB partitions

- using gParted (default in ubuntu)
  - select pendrive (`/dev/sda`) from dropdown
  - delete all partitions and apply
  - create new volume (FAT32) with all available space
- if usb doesn't show: open "Disks" app -> select pendrive -> click mount (play button)

## Special / unicode chars

- ref: <https://unicode.org/emoji/charts/full-emoji-list.html>
- `(Ctrl+Shift)+unicode`, eg `00B0` means `u00B0` -> `(Ctrl+Shift)+u00B0`
- hold `Ctrl+Shift`, enter `u`, release, enter code, press Enter
- or install 'insert unicode' vsc extension
  - place cursor where needed, `ctrl+shift+p`, search "insert unicode: insert"

## Enable / Disable Service on System Start

- eg: for docker
- stop service:

   ```bash
     sudo systemctl stop docker
     sudo systemctl stop docker.socket
   ```

- disable

   ```bash
    sudo systemctl disable docker
    sudo systemctl disable docker.socket
   ```

- verify

  ```bash
     systemctl is-enabled docker
     systemctl is-enabled docker.socket
  ```

- `Note:-`
  - we can use `servive` instead of `systemctl`
  - eg: `sudo systemctl stop docker` = `sudo service docker stop`

## Remote access

### SSH server

- ref: <https://likegeeks.com/ssh-connection-refused/>
- `sudo apt-get install openssh-server`
- check status: `service sshd status` (enable/disable auto start)

### SSH key & passwordless auth

- generate: `ssh-keygen -t rsa -b 2048`
- convert to pem: `openssl rsa -in trb -outform pem > trb.pem`
- to enable passwordless auth: add client's ssh `.pub` to remote's known hosts
  - `vim /etc/ssh/sshd_config`, change `PasswordAuthentication yes` to `no` (~line 79)
  - `systemctl restart sshd`

### SSH connect examples

- `ssh -i cent_1.pem root@ec2-13-235-27-223.ap-south-1.compute.amazonaws.com`
- `ssh -i ubuntu-ec2.pem ubuntu@ec2-184-72-101-49.compute-1.amazonaws.com`

### git on centos

- ref: <https://stackoverflow.com/questions/21820715/how-to-install-latest-version-of-git-on-centos-7-x-6-x>
- `yum install http://opensource.wandisco.com/centos/6/git/x86_64/wandisco-git-release-6-1.noarch.rpm`
- `yum install git`
- `git --version`
- `yum install nano`

### scp (file transfer)

- `scp <OPTIONS> <SOURCE> <TARGET>`
- local to remote: `scp <file_path> <user>@<remote_host>:<remote_dir>`
  - eg: `scp -i Linux_Centos12012020.pem env.js root@ec2-13-235-27-223.ap-south-1.compute.amazonaws.com:/root/try`
- remote to local: `scp <user>@<remote_host>:<remote_file_path> <local_dir>`
  - eg: `scp -i Linux_Centos12012020.pem root@ec2-13-235-27-223.ap-south-1.compute.amazonaws.com:/root/try ~/Desktop`

### AWS EC2 new instance setup

1. choose ubuntu server
2. security group (new one, can add TCP protocols now or later)
3. launch
4. connect: `ssh -i ubuntu-ec2.pem ubuntu@ec2-35-171-153-96.compute-1.amazonaws.com` (type `yes` when asked)
5. install node: `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -` then `sudo apt install nodejs`
6. install git: `sudo apt install git`
7. clone repos
8. transfer files: `scp -i ubuntu-ec2.pem env.js ubuntu@ec2-35-171-153-96.compute-1.amazonaws.com:~`
9. add ports: instance -> security group -> inbound rules -> edit -> add custom TCP (enable both frontend & backend ports)
10. start servers, configure properly

### Connecting with FileZilla (.pem)

- `Edit > Settings > SFTP > add file` (add `.pem`, can add many)
- `File > Site Manager > New Site`
  - Protocol: SFTP
  - Port: blank (or 22)
  - Username: give
  - Password: blank (connects automatically using the `.pem` file)

### SSH keys (general)

- generate: `ssh-keygen` (use default location `~/.ssh/id_rsa` / `id_rsa.pub`, or any folder; use a strong passphrase)
- add public key to remote server
  - `cat ~/.ssh/id_rsa.pub | ssh -i pem_file.pem user@ec2-instance.com "cat >> .ssh/authorized_keys"`
  - or manually: copy `cat ~/.ssh/id_rsa.pub` output, login to remote, `nano ~/.ssh/authorized_keys`, paste on new line
- if more than one ssh key exists, add explicitly: `ssh-add path_to_ssh` (eg `ssh-add ~/.ssh/id_rsa_do`)
  - if error `couldn't open connection to agent`: restart agent with `` eval `ssh-agent -s` ``
- if it asks passphrase every time: `ssh-add`
  - if error `Could not open a connection to your authentication agent`: `eval $(ssh-agent)`

### Remote GUI client (eg with pem file)

- new connection -> Name: any, Protocol: SSH, Server: ip_address, Username: ubuntu/root
- Authentication Type: SSH identity file, check the box and select the file -> connect

### Connect linux from windows (xrdp)

- `sudo apt install xrdp`
- enable auto start (optional): `sudo systemctl enable --now xrdp`
- allow port: `sudo ufw allow 3389`
- add user to ssl-cert group (only these users can access xrdp): `adduser ravinder ssl-cert`
- restart: `systemctl restart xrdp`
- note: only one user login session allowed (can't use system with same user remotely & locally)
  - create a separate user for rdp and logout the local user
  - if blank screen appears on windows login: means same user is accessing the system, logout the local one

## Timezone

- see current: `date`
- list all: `timedatectl list-timezones | grep -i Asia`
- set: ref <https://forum.boltiot.com/t/convert-the-utc-to-ist-in-linux/2127>
  1. `timedatectl list-timezones | grep -i Asia`
  2. `sudo unlink /etc/localtime`
  3. `sudo ln -s /usr/share/zoneinfo/[zone/timezone] /etc/localtime` (eg `Asia/Kolkata`)
  4. `date` to verify

## Systemd service

eg: NAT server service, ref <https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-nats-on-ubuntu-16-04>

- optional: create a dedicated user per service
  - `sudo adduser --system --group --no-create-home --shell /bin/false nats`
  - `sudo chown -R nats:nats /srv`
- create service file: `sudo nano /etc/systemd/system/nats.service`

  ```text
  [Unit]
  Description=NATS messaging server

  [Service]
  ExecStart=/srv/nats/bin/gnatsd -c /srv/nats/gnatsd.config
  User=nats
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target
  ```

  - `WantedBy=multi-user.target` starts the service on boot
- `sudo systemctl start nats`
- `sudo systemctl status nats`
- `sudo systemctl stop nats`
- `sudo systemctl daemon-reload` after changing the service file
