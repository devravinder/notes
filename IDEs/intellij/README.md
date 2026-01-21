# IntelliJ IDEA Notes

This document contains a collection of notes, recommended plugins, and keyboard shortcuts for IntelliJ IDEA.

## Recommended Plugins

- `Copilot`: AI-powered code completion and suggestion tool.
- `Lombok`: Reduces boilerplate code for model/data objects (e.g., getters, setters, constructors).
- `Codeium`: A free AI code completion tool, similar to Copilot.

## Troubleshooting

### Codeium Not Opening

If the Codeium tool window or login page does not open correctly, you may need to disable the JCEF sandbox.

1. Go to `Help > Find Action...`.
2. Search for "Registry" and open it.
3. Find the key `ide.browser.jcef.sandbox.enable` and disable it (uncheck the box).
4. Restart the IDE.

## Keyboard Shortcuts

1. `Shift + Shift` – `Search Everywhere` **
   - Find any file, action, class, or symbol.

2. `Ctrl + E` – `Recent Files` **
   - Show a list of recently opened files.

3. `Ctrl + Shift + F` – `Find in Files`
   - Search for a string in the entire project.

4. `Ctrl + Shift + R` – `Replace in Files`
   - Find and replace a string in the entire project.

5. `Alt + Insert` – `Generate Code` **
   - Create constructors, getters, setters, `toString()`, etc.

6. `Ctrl + Alt + O` – `Optimize Imports` **
   - Remove unused imports and organize current ones.

7. `Ctrl + Shift + /` – `Block Comment` **
   - Create or remove block comments for selected code.

8. `Ctrl + Shift + Up/Down Arrow` – `Move Line` **
   - Move the current line or selected block up or down.

9. `Shift + F10` – `Run` **
   - Run the current configuration.

10. `Alt + Shift + Insert` – `Column Selection Mode`
    - Toggle between line and column (block) selection.

11. `Alt + Shift + Click/Drag` – `Multi-Cursor` **
    - Place multiple cursors to edit simultaneously.

12. `Shift + F6` – `Rename` **
    - rename variable / file.
