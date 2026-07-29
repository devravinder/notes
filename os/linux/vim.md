# Vim

- `vi` enter vim editor
- `:w` save (all save-related interactions start with `:`)
- `:q` quit current file, `:qa` exit all files
- `:wq` or `ZZ` save and quit
- `:q!` quit without save
- `i` enter insert mode, `Esc` exit insert mode
- navigation: arrow keys, also `h,j,k,l`

note: exit insert mode with `Esc` before using these:
- `O` insert new line before current line
- `o` insert new line after current line
- `S` delete entire line
- `u` undo
- `R` or `C` redo (not always working)
- `0` beginning of line (also `shift+home`)
- `$` end of line (also `shift+end`)
- `gg` first line
- `yy` copy (mouse copy also works)
- `p` paste (mouse also works)
- `:set number` show line numbers
- `:20` go to line 20
- `:set nonumber` hide line numbers
