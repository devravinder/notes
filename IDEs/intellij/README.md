# IntelliJ IDEA Notes

This document contains a collection of notes, recommended plugins, and keyboard shortcuts for IntelliJ IDEA.

## Recommended Plugins

-   **Copilot**: AI-powered code completion and suggestion tool.
-   **Lombok**: Reduces boilerplate code for model/data objects (e.g., getters, setters, constructors).
-   **Codeium**: A free AI code completion tool, similar to Copilot.

## Troubleshooting

### Codeium Not Opening

If the Codeium tool window or login page does not open correctly, you may need to disable the JCEF sandbox.

1.  Go to `Help > Find Action...`.
2.  Search for "Registry" and open it.
3.  Find the key `ide.browser.jcef.sandbox.enable` and disable it (uncheck the box).
4.  Restart the IDE.

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Shift + Shift` | **Search Everywhere**: The most important shortcut. Find any file, action, class, or symbol. |
| `Ctrl + E` | **Recent Files**: Show a list of recently opened files. |
| `Ctrl + Shift + F` | **Find in Files**: Search for a string in the entire project. |
| `Ctrl + Shift + R` | **Replace in Files**: Find and replace a string in the entire project. |
| `Alt + Insert` | **Generate Code**: Create constructors, getters, setters, `toString()`, etc. |
| `Ctrl + Alt + O` | **Optimize Imports**: Remove unused imports and organize current ones. |
| `Ctrl + Shift + /` | **Block Comment**: Create a block comment for the selected code, or uncomment if it's already commented. |
| `Ctrl + Shift + Up/Down Arrow` | **Move Line**: Move the current line or selected block up or down. |
| `Shift + F10` | **Run**: Run the current configuration. |
| `Alt + Shift + Insert` | **Column Selection Mode**: Toggle between line selection and column (block) selection. |
| `Alt + Shift + Click/Drag` | **Multi-Cursor**: Place cursors at multiple locations to edit them simultaneously. |
