# Git Notes

This document contains notes and commands related to Git.

## Partial Cloning

Partial cloning is a feature that allows you to clone a repository without downloading all of its history or all of its files. This can be useful for very large repositories.

### Sparse Checkout

Sparse checkout allows you to check out only a subset of the files in a repository.

Here is an example of how to use sparse checkout to clone only a specific sub-folder from a repository:

1.  **Clone the repository with no checkout and a depth of 1:**
    This downloads the repository information but does not check out any files.
    ```bash
    git clone -n --depth=1 --filter=tree:0 <repository_url>
    ```
    **Example:**
    ```bash
    git clone -n --depth=1 --filter=tree:0 https://github.com/eugenp/tutorials.git
    ```

2.  **Navigate into the repository directory:**
    ```bash
    cd <repository_folder>
    ```

3.  **Set up sparse checkout to specify the desired sub-folder:**
    ```bash
    git sparse-checkout set --no-cone <sub_folder_path>
    ```
    **Example:**
    ```bash
    git sparse-checkout set --no-cone spring-reactive-modules/spring-reactive-oauth
    ```

4.  **Finally, check out the files:**
    ```bash
    git checkout
    ```
    This will check out only the files in the sub-folder you specified.
