# Linux software installation

## General workflow (fresh ubuntu)

1. install ubuntu from official site & follow steps
2. install required softwares
3. add aliases
4. generate ssh (and link with git)

## Install methods

- `.deb` file: `sudo apt install ./some.deb`
- `.run` file
  - `chmod +x file.run`
  - `./file.run`
- `.tar.gz` (source)
  - unpack: `tar -zxvf file.tar.gz`
  - `cd` into folder, read README for specifics, usually:
    - `./configure`
    - `make`
    - `sudo make install`
  - if that fails/isn't available: copy the extracted folder to `/opt/` and create a desktop entry for it

## Uninstalling

- see all installed
  - `sudo apt list --installed` (debian)
  - `snap list`
  - or list desktop entries: `for app in /usr/share/applications/*.desktop ~/.local/share/applications/*.desktop; do app="${app##/*/}"; echo "${app::-8}"; done`
- search: `sudo apt list --installed | grep key-word`
- remove
  - `sudo apt remove package_name`
  - `sudo snap remove package_name`
  - `sudo apt purge package_name` (remove completely, with settings)
  - `sudo dpkg -r package_name` (deb)
  - `sudo dpkg -r --force-all package_name`

## Desktop entries

- create `appname.desktop` in `/usr/share/applications`

eg (Postman):
```
[Desktop Entry]
Categories=Development;
Comment=Supercharge your API workflow
Exec="/home/ravinder/Soft/postman/Postman/app/Postman"
Icon=/home/ravinder/Soft/postman/Postman/app/icons/icon_128x128.png
Name=Postman
Terminal=false
Type=Application
Version=1.0
```

eg (STS):
```
[Desktop Entry]
Type=Application
Name=sts
Comment=Spring Tool Suite
Icon=/home/pvr/sts-bundle/sts-3.8.2.RELEASE/icon.xpm
Exec=/home/pvr/sts-bundle/sts-3.8.2.RELEASE/STS
Terminal=false
Categories=Development;IDE;Java;
StartupWMClass=STS
```

eg (FileZilla):
```
[Desktop Entry]
Type=Application
Name=FileZilla
Comment=File Zilla ( FTP Client )
Icon=/opt/FileZilla3/share/pixmaps/filezilla.png
Exec=/opt/FileZilla3/bin/filezilla
Terminal=false
Categories=Network;FileTransfer;
```

eg (needs root password, eg XAMPP):
```
[Desktop Entry]
Encoding=UTF-8
Name=XAMPP Control Panel
Comment=Start and Stop XAMPP
Exec=sudo /opt/lampp/manager-linux-x64.run
Icon=/opt/lampp/htdocs/favicon.ico
Categories=Application
Type=Application
Terminal=false
```

- desktop entry folders: `/usr/share/applications`, `/usr/local/share/applications`, `~/.local/share/applications`
- installed apps folder: `/opt` (and many more)

## Re-installing ubuntu (full checklist)

before uninstalling, back up: programs, drive content, aliases, notes folder, list of required software (chrome, dbeaver-ce, VSC, git, node&npm, jdk, postman, sts, tomcat, android-studio, remmina, any-desk, vlc, youtube-dl, filezilla, kazam, printer-driver)

steps after fresh install:
1. install chrome
2. update aliases
3. `apt install curl`
4. install node & npm (ref https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
   - enable repo: `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
   - `sudo apt install nodejs`
   - check: `node --version`, `npm --version`
5. `sudo apt install git`
6. install VSC from app store + extensions: es7 react/graphQL snippets, gitlens, markdown preview, vetur, live server (optional), golang, svelte (optional), debugger for chrome, docker, eslint, terraform, insert unicode
7. dbeaver-ce from app store
8. postman from app store
9. JDK setup
   - jdk 8: `sudo apt-get install openjdk-8-jdk`, `sudo apt-get install openjdk-8-jre`, check `javac -version`
   - to manage more than one jdk, use `update-alternatives` (see software.md)
10. download sts (eclipse) and create desktop entry (see above)
11. VLC media player from app store
12. `apt install youtube-dl`
13. android-studio
    - download zip, extract, run `studio.sh` in bin folder (installs sdk to `/home/ravinder/Android/Sdk` or similar)
    - `sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386`
    - set in `.bashrc`:
      ```bash
      export ANDROID_HOME="/home/ravinder/Android/Sdk"
      export PATH="$PATH:$ANDROID_HOME/tools"
      export PATH="$PATH:$ANDROID_HOME/platform-tools"
      alias android="/home/ravinder/Drive/soft/android-studio/android-studio-ide-191.6010548-linux/android-studio/bin/studio.sh"
      ```
    - install KVM for emulator acceleration (ref https://developer.android.com/studio/run/emulator-acceleration)
      - `apt install cpu-checker`
      - check: `egrep -c '(vmx|svm)' /proc/cpuinfo` (>1 means KVM installable) or `kvm-ok`
14. printer drivers
    - epson L365: ref https://askubuntu.com/questions/771427/how-to-install-epson-printer-drivers-on-ubuntu-16-04
    - hp: `apt install hplip`
