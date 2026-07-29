# Useful softwares

software usages documented below

## Default softwares

- `update-alternatives` to use multiple versions of same software
- `whereis` to find software installation location
- `man` to see manual page of a software
- `ln` to create symlink to a file
- `wget` to download something
- `tar` to extract files

### update-alternatives usage

ref: https://man7.org/linux/man-pages/man1/update-alternatives.1.html, https://www.baeldung.com/linux/update-alternatives-command

steps: install required versions -> add to update-alternatives -> configure required version -> test

eg (jdk):
1. install versions
   - `sudo apt update`
   - `sudo apt install openjdk-8-jdk -y`
   - `sudo apt install openjdk-17-jdk -y`
2. add java, javac, jshell, jar
   - `sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/open-jdk-23/bin/java 2300`
   - `sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/open-jdk-23/bin/javac 2300`
   - `sudo update-alternatives --install /usr/bin/jar jar /usr/lib/jvm/open-jdk-23/bin/jar 2300`
   - `sudo update-alternatives --install /usr/bin/jshell jshell /usr/lib/jvm/open-jdk-23/bin/jshell 2300`
3. configure
   - `sudo update-alternatives --config java`
   - `sudo update-alternatives --list java`
   - `sudo update-alternatives --display java`
4. test: `java -version`

## External softwares

- Chrome, Brave
- git
- sdkman (for java)
- nvm (for node & npm)
- pnpm (install with npm)
- bun (install with pnpm)
- vsc
- intellij (also add desktop entry)
- postman (also add desktop entry)
- docker
- dbeaver
- mongodb-compass
- remmina (RDP client)
- Taskfile: https://taskfile.dev/installation/
- go
  - add bin path to `/etc/environment`
- Kind
  - to run container clusters locally (like K8s, same as minikube)
  - a go package, installed in go packages bin folder
  - add this also to `/etc/environment`
- kubectl - to manage kubernetes clusters
- Lens (kontena-lens / k8slens)
  - install using snap store
- tmux
  - terminal multiplexer, for multiple terminal sessions in background
- redis-tools (optional) - redis cli
- diodon - clipboard manager
- helm (helm-classic) - with snap
- libre-office - with apt
- vlc - with snap
- UxPlay - for screen mirroring from mobiles
  - start: `uxplay`
  - start & show server name: `uxplay -n "Ravinder Laptop"`
  - specific resolution: `uxplay -s 1920x1080`
  - audio only: `uxplay -async`
  - rotate screen: `uxplay -r L` (or `-r R`)
  - to restart: `sudo pkill uxplay` then `uxplay` (else mirroring sometimes won't work)
- gnome-shell-extension-manager - to install extensions using GUI
- codex (chatGPT CLI) & Gemini, using pnpm
  - `pnpm add -g @openai/codex`
  - `pnpm add -g @google/gemini-cli`
