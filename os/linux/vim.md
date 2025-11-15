# Vim Quick Reference

This is a quick reference guide for basic Vim commands.

## Modes

Vim is a modal editor, which means it has different modes for different tasks. The two most basic modes are:

-   **Normal Mode**: The default mode. Used for navigation, deletion, copying, pasting, and executing commands.
-   **Insert Mode**: Used for typing and editing text.

| Action | Command |
| :--- | :--- |
| Enter Insert Mode | `i` |
| Exit Insert Mode | `Esc` |

## Basic Commands

All commands are executed from **Normal Mode**.

### Saving and Quitting

| Command | Action |
| :--- | :--- |
| `:w` | Save the current file. |
| `:q` | Quit the current file. |
| `:qa` | Quit all open files. |
| `:wq` | Save and quit. |
| `ZZ` | A shortcut for `:wq`. |
| `:q!` | Quit without saving changes. |

### Navigation

| Command | Action |
| :--- | :--- |
| `h`, `j`, `k`, `l` | Move left, down, up, right. |
| `0` (zero) | Go to the beginning of the current line. |
| `$` | Go to the end of the current line. |
| `gg` | Go to the first line of the file. |
| `G` | Go to the last line of the file. |
| `:20` | Go to line number 20. |

### Editing

| Command | Action |
| :--- | :--- |
| `o` | Insert a new line **after** the current line and enter Insert Mode. |
| `O` | Insert a new line **before** the current line and enter Insert Mode. |
| `S` | Delete the entire current line and enter Insert Mode. |
| `u` | Undo the last change. |
| `Ctrl + r` | Redo the last undone change. |

### Copy, Paste, and Delete

| Command | Action |
| :--- | :--- |
| `yy` | Yank (copy) the entire current line. |
| `p` | Paste the copied or deleted text after the cursor. |
| `P` | Paste before the cursor. |
| `dd` | Delete the entire current line. |
| `dw` | Delete from the cursor to the beginning of the next word. |

## Settings

| Command | Action |
| :--- | :--- |
| `:set number` | Display line numbers. |
| `:set nonumber` | Hide line numbers. |
