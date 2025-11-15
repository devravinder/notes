# Java Development Notes

This document contains notes and guides related to Java development.

## SDKMAN

SDKMAN is a tool for managing parallel versions of multiple Software Development Kits on most Unix-like systems. It's particularly useful for managing different versions of Java, Scala, Groovy, and other JVM-based languages.

### Installation

1.  **Install SDKMAN**:
    ```bash
    curl -s "https://get.sdkman.io" | bash
    ```
    After running this, follow the instructions on the screen, which will likely involve sourcing a script in your shell profile.

2.  **Check the version** to verify the installation:
    ```bash
    sdk version
    ```

3.  **Update SDKMAN** to the latest version:
    ```bash
    sdk selfupdate force
    ```

### Usage

#### Managing SDKs

-   **List all available SDKs**:
    ```bash
    sdk list
    ```

-   **List available versions of a specific SDK** (e.g., Java):
    ```bash
    sdk list java
    ```

-   **Install the latest stable version** of an SDK:
    ```bash
    sdk install java
    ```

-   **Install a specific version**:
    ```bash
    sdk install java 17.0.2-tem
    ```

-   **Uninstall a version**:
    ```bash
    sdk uninstall java 17.0.2-tem
    ```

#### Switching Between Versions

-   **Use a specific version in the current shell**:
    This change is only active for the current terminal session.
    ```bash
    sdk use java 11.0.12-tem
    ```

-   **Set a default version** for all new shells:
    ```bash
    sdk default java 11.0.12-tem
    ```

-   **Check the currently used version**:
    ```bash
    sdk current java
    ```

### Project-Specific Java Version

You can define a specific Java version for a project, so you don't have to manually switch every time you work on it.

1.  **Navigate to your project's root directory.**

2.  **Create a `.sdkmanrc` file**. You can do this manually or by running:
    ```bash
    sdk env init
    ```

3.  **Add the desired Java version** to the `.sdkmanrc` file:
    ```
    # .sdkmanrc
    java=21.0.4-tem
    ```

Now, whenever you `cd` into this directory, SDKMAN will automatically prompt you to use the specified Java version if it's not already active.
