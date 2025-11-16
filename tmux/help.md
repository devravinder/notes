# Tmux Help

-   **Session:** tmux session
-   **Pane:** Terminal within a tmux session
-   **Prefix Key:** `Ctrl + b`
-   **Window:** Parent Terminal of Pane
    -   One window can have any number of Panes
    -   In one tmux session, we can have multiple windows

---

## Getting Started

1.  **To enter tmux:**
    ```bash
    tmux
    ```

---

## Panes

2.  **For a new Pane:**
    -   `Ctrl + b` then `%` (for vertical Pane)
    -   `Ctrl + b` then `"` (for horizontal Pane)

3.  **To switch between Panes:**
    -   `Ctrl + b` then `arrow-keys`
    -   `Ctrl + b` then `o` (to next pane)

4.  **Resizing the Panes:**
    -   `Ctrl + b` then `Ctrl + arrow-keys`

5.  **For exit (close) Pane:**
    ```bash
    exit
    ```

---

## Windows

6.  **To create a new window:**
    -   `Ctrl + b` then `c`
    -   The active window is marked with `*`
    -   The window name is shown at the bottom-left

7.  **To switch between windows:**
    -   `Ctrl + b` then `window-number` (window number can be seen at the bottom-left)

8.  **To rename a window:**
    -   `Ctrl + b` then `,` (comma)
    -   Then enter text and press enter

9.  **To exit a window:**
    ```bash
    exit
    ```

---

## Sessions

10. **To detach the current session:**
    -   `Ctrl + b` then `d`
    -   We can also directly close the terminal

11. **To list tmux sessions:**
    ```bash
    tmux ls
    ```

12. **To attach a session:**
    -   `tmux attach -t session_name_or_number` (session-number can be seen from the list)
    -   `tmux attach` (attaches the last session)

13. **To rename a session:**
    ```bash
    tmux rename-session -t session-number
    ```

14. **To create a session:**
    ```bash
    tmux new
    ```

15. **To create a session with a name:**
    ```bash
    tmux new -s session_name
    ```

16. **To kill/stop a session:**
    ```bash
    tmux kill-session -t session_name_or_number
    ```

---

## Important Commands

17. **New session & command to execute from CMD:**
    ```bash
    tmux new 'command_to_execute'
    ```
    Example: `tmux new 'serve -p 3000'`

18. **New session & detach mode & command to execute from CMD:**
    ```bash
    tmux new -d 'command_to_execute'
    ```
    Example: `tmux new -d 'serve -p 3000'`

19. **New session with name & detach mode & command to execute from CMD:**
    ```bash
    tmux new -s session_name -d 'command_to_execute'
    ```
    Example: `tmux new -s s1 -d 'serve -p 3000'`

20. **To add a new pane to an existing session from CMD (by default detach mode):**
    ```bash
    tmux split-window -t session_name_or_number -v 'command_to_execute'
    ```
    Examples:
    -   `tmux split-window -t s1 -v 'serve -p 4000'`
    -   `tmux split-window -t s1 -h 'serve -p 5000'`
    -   `-v` for vertical split
    -   `-h` for horizontal split

21. **New session & multiple Panes in detach mode:**
    ```bash
    tmux new -s s1  -d 'serve -p 3000' \; split-window -h -t s1 'top'    # top is a command
    ```
    or
    ```bash
    tmux new -s s1 -d 'serve -p 3000' && tmux split-window -h -t s1 'top'
    ```