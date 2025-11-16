# Tmux Aliases

| Alias | Command | Description |
| :--- | :--- | :--- |
| `t` | `tmux` | |
| `td` | `tmux detach` | Detach current session |
| `ta` | `tmux attach` | Attach to the latest session |
| `tls` | `tmux ls` | List all sessions |

---

## Split Window (Panes)

These commands split the window of the current session and are in detach mode by default.

| Alias | Command | Description |
| :--- | :--- | :--- |
| `twsv` | `tmux split-window -v` | Creates horizontal panes |
| `twsh` | `tmux split-window -h` | Creates vertical panes |

---

## Sessions

| Alias | Command | Description |
| :--- | :--- | :--- |
| `ts` | `tmux new` | Create a new session |
| `tsl` | `tmux ls` | List all sessions |
| `tsn` | `tmux new -s` | Create a named session |
| `tsd` | `tmux new -d` | Create a session in detach mode |
| `tsa` | `tmux attach -t` | Attach to a session by name or ID |
| `tsac` | `tmux split-window -h -t` | Add a command to a session (session name or ID is mandatory) |
| `tsr` | `tmux rename-session -t` | Rename a session |
| `tsk` | `tmux kill-session -t` | Kill a session |

---

## Commands to Execute

### `tcs` function

```bash
function tcs(){
     if [ "$#" -lt 1 ]; then
        echo "Error: At least one argument is required."
    fi

    tmux new -d $1

    shift  # remove the first one

    for arg in "$@"; do
      tmux split-window -h $arg
    done
}
```

---

## Useful Commands

**Note:** `Ctrl + b` is the prefix key for shortcuts.

| Shortcut | Description |
| :--- | :--- |
| `Ctrl + b` then `Ctrl + arrow-keys` | Resize pane |
| `Ctrl + b` then `arrow-keys` | Switch between panes |
| `Ctrl + b` then `d` | Detach from the current session |
| `Ctrl + b` then `%` | Split horizontally |
| `Ctrl + b` then `"` | Split vertically |
