# Linux Shortcuts and Aliases

This document provides a collection of useful keyboard shortcuts and shell aliases to improve your productivity in a Linux environment.

## Keyboard Shortcuts (GNOME)

The "Super" key is the Windows key on most keyboards. You can define custom keyboard shortcuts in `Settings > Devices > Keyboard`.

### Terminal

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Alt + T` | Open a new terminal window. |
| `Ctrl + Shift + T` | Open a new tab within the current terminal window. |
| `Alt + <number>` | Switch to the terminal tab corresponding to the number. |

### Window Management

| Shortcut | Action |
| :--- | :--- |
| `Super + Arrow Key` | Snap the current window to the left/right/top/bottom. |
| `Alt + Tab` | Switch between open windows. |
| `Alt + Esc` | Cycle through open windows. |
| `Super` | Open the Activities overview (spread of all windows). |
| `Super + H` | Hide the current application window. |
| `Ctrl + Q` | Quit the current application. |

### Workspace and Apps

| Shortcut | Action |
| :--- | :--- |
| `Super + PageUp / PageDown` | Switch between workspaces. |
| `Ctrl + Alt + Arrow Key` | Switch between workspaces. |
| `Super + A` | Show the applications grid. |
| `Super + <number>` | Launch the application pinned to the corresponding number on the dock. |

### System and Screenshots

| Shortcut | Action |
| :--- | :--- |
| `Super + L` | Lock the screen. |
| `Ctrl + Alt + Delete` | Log out. |
-   **`Shift + PrtSc`**: Take a screenshot of a selected area.
-   **`Ctrl + Shift + Alt + R`**: Start or stop screen recording.

---

## Shell Aliases

These aliases can be added to your `~/.bashrc` or `~/.zshrc` file to create shortcuts for commonly used commands.

### General System

```bash
# General
alias cls='clear'
alias gedit='gnome-text-editor' # For newer GNOME versions

# File operations
alias cf='gedit' # Usage: cf my_file.txt
alias of='gedit' # Usage: of my_file.txt
alias cpf='xclip -sel clip <' # Usage: cpf my_file.txt (copies file content)

# Environment and config
alias eb='gedit ~/.bashrc' # Edit bashrc
alias sb='source ~/.bashrc' # Source/reload bashrc
alias ee='gedit /etc/environment' # Edit system-wide environment variables
alias re='source /etc/environment' # Reload environment variables
```

### Process and Port Management

```bash
# List listening ports
alias ports-listen='lsof -i -P -n | grep LISTEN'
alias p-l='ports-listen'

# Search for a process using a specific port
alias ports-search='lsof -i -P -n | grep' # Usage: p-s 8080
alias p-s='ports-search'

# Kill processes
alias kill-process='kill' # Usage: kill-process 1234
alias kill-process-force='kill -9' # Usage: k-p-f 1234
alias k-p-f='kill-process-force'
```

### Git Aliases

A comprehensive set of Git aliases for faster version control.

#### Core Commands

```bash
alias g='git'
alias gs='git status'
alias glg='git log'
alias glgg='git log --graph'

# Add & Commit
alias gac='git add -A && git commit -m' # Usage: gac "Your message"

# Clone
alias gcl='git clone'
```

#### Stashing

```bash
alias gst='git add -A && git stash push -m' # Usage: gst "WIP"
alias gstp='git stash pop'
alias gsta='git stash apply'
alias gstl='git stash list'
alias gstc='git stash clear'
```

#### Branching and Merging

```bash
# Branching
alias gb='git branch'
alias gbl='git branch' # List local branches
alias gbr='git branch -a' # List all (local + remote) branches
alias gc='git checkout'
alias gcb='git checkout -b' # Create and checkout new branch

# Merging
alias gm='git merge'
alias gms='git merge --squash'

# Deleting branches
alias gbd='git branch -d' # Delete merged local branch
alias gbD='git branch -D' # Force delete local branch
alias gpdo='git push -d origin' # Delete remote branch
```

#### Remote Operations

```bash
# Remotes
alias grv='git remote -v'
alias grao='git remote add origin'

# Push
alias gp='git push'
alias gpo='git push origin' # Push to origin
alias gpom='git push origin master'
alias gpu='git push -u' # Push and set upstream

# Force Push (Use with caution!)
alias gP='git push -f'
alias gPo='git push -f --all origin'

# Pull / Fetch
alias gl='git pull'
alias glo='git pull origin'
alias gf='git fetch'
```

#### Resetting and Reverting

```bash
# Unstage all files
alias gu='git reset HEAD -- .'

# Hard reset to a branch (discards local changes)
alias gRs='git reset --hard' # Usage: gRs origin/master
```

### Tmux (Terminal Multiplexer)

```bash
alias t='tmux'
alias tls='tmux ls' # List sessions
alias ta='tmux attach' # Attach to the last session
alias tsa='tmux attach -t' # Attach to a named session
alias tsn='tmux new -s' # Create a new named session
alias td='tmux detach' # Detach from the current session
alias tsk='tmux kill-session -t' # Kill a named session

# Split panes
alias twsv='tmux split-window -v' # Split vertically (horizontal pane)
alias twsh='tmux split-window -h' # Split horizontally (vertical pane)
```
-   **Prefix Key**: `Ctrl + b`
-   **Detach**: `Ctrl + b` then `d`
-   **Split Horizontal**: `Ctrl + b` then `"`
-   **Split Vertical**: `Ctrl + b` then `%`
-   **Switch Panes**: `Ctrl + b` then `Arrow Key`

### NPM and PNPM

```bash
# NPM
alias ns='npm start'
alias nrd='npm run dev'
alias nrt='npm run test'
alias rmn='rm -rf node_modules'

# PNPM
alias p='pnpm'
alias pi='pnpm i'
alias pr='pnpm run'
alias crav='pnpm create vite'
```
