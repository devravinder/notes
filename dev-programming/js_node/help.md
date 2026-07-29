# Node & npm

## Install with nvm

- add to `.bashrc` (or any script that runs per user, every shell):
  ```bash
  export NVM_DIR="/home/ravinder/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
  ```
- install nvm (check docs for latest version): `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
- see available versions: `nvm ls-remote`
- install a version: `nvm install 16.16.0`
- then install pnpm globally with npm, and use pnpm only

## Multiple node versions

- `nvm install 10`
- `nvm install 18`
- `nvm install 20`
- use one: `nvm use 20`
- set default: `nvm alias default 20`

## npx not working (path has spaces)

- eg error: `npm ERR! Could not install from "...\npm-cache\_npx\14184" as it does not contain a package.json file`
- cause: npm cache path contains spaces, npx treats space-separated string as separate values
- check: `npm config list`
- fix: replace space with `~1` in the path
  - eg: `npm config set cache "C:\\Program~1Files\\Git\\home\\ravinder\\.npm-global"`

## Misc

- see unimported packages: `npx unimported`
- update all npm packages to latest
  - `npm i -g npm-check-updates`
  - `ncu -u`
  - `npm install`
