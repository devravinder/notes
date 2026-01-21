# Vim Quick Reference

Quick reference guide for basic Vim commands.

## Modes

Vim is a modal editor. The two main modes are:

- `Normal Mode`
  - Default mode
  - Used for navigation, copy, paste, delete, and commands

- `Insert Mode`
  - Used for typing and editing text

### Mode Switching

1. `i` – Enter Insert Mode
   - Start typing text

2. `Esc` – Exit Insert Mode
   - Return to Normal Mode

---

## Basic Commands

All commands run from `Normal Mode`.

### Saving and Quitting

1. `:w` – Save file
   - Writes changes to disk

2. `:q` – Quit file
   - Exit if no unsaved changes

3. `:qa` – Quit all
   - Close all open files

4. `:wq` – Save & quit
   - Write and exit

5. `ZZ` – Quick save & quit
   - Same as `:wq`

6. `:q!` – Force quit
   - Exit without saving

---

### Navigation

1. `h` `j` `k` `l` – Cursor movement
   - Left, down, up, right

2. `0` – Line start
   - Jump to beginning of line

3. `$` – Line end
   - Jump to end of line

4. `gg` – File start
   - Go to first line

5. `G` – File end
   - Go to last line

6. `:20` – Jump to line
   - Goes to line number 20

---

### Editing

1. `o` – New line after
   - Insert below current line

2. `O` – New line before
   - Insert above current line

3. `S` – Replace line
   - Delete current line and enter insert mode

4. `u` – Undo
   - Revert last change

5. `Ctrl + r` – Redo
   - Re-apply undone change

---

### Copy, Paste, Delete

1. `yy` – Copy line
   - Yank current line

2. `p` – Paste after
   - Paste below cursor

3. `P` – Paste before
   - Paste above cursor

4. `dd` – Delete line
   - Remove current line

5. `dw` – Delete word
   - Delete from cursor to next word

---

## Settings

1. `:set number` – Show line numbers
   - Enables numbering

2. `:set nonumber` – Hide line numbers
   - Disables numbering
