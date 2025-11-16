# SSH Help

**References:**

-   [The Ultimate Guide to SSH](https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/)
-   [How to Set Up Multiple SSH Keys](https://betterprogramming.pub/how-to-set-up-multiple-ssh-keys-ae6688f76570)
-   [Best way to use multiple SSH private keys on one client](https://stackoverflow.com/questions/2419566/best-way-to-use-multiple-ssh-private-keys-on-one-client)

---

## Configure More Than One SSH Key

If you need to connect to the same host with different keys, you can achieve it by following these steps.

**Example:** We want to use one SSH key for work and another for personal use.

### Steps

1.  **Generate both SSH keys:**

    ```bash
    ssh-keygen -t rsa  # use one default path ( ~/.ssh )
    ssh-keygen -t rsa  # give one different path from default (eg: ~/.ssh2 )
    ```

2.  **Add alias host name:**

    In your `~/.ssh/config` file, add a similar configuration:

    ```
    Host work
      HostName bitbucket.org
      IdentityFile ~/.ssh/id_rsa    ## /User/admin/.ssh/id_rsa
      User git

    Host personal
      HostName bitbucket.org
      IdentityFile ~/.ssh2/id_rsa  ## /User/admin/.ssh2/id_rsa
      User git
    ```

3.  **Add SSH private keys to ssh-agent:**

    The default one will be added automatically.

    ```bash
    ssh-add ~/.ssh2/id_rsa
    ```

4.  **Use aliases while adding origin (or while cloning):**

    Then instead of cloning your repos like this:

    ```
    git clone git@bitbucket.org:username/my-work-project.git
    git clone git@bitbucket.org:username/my-personal-project.git
    ```

    You must do this:

    ```
    git clone git@work:username/my-work-project.git
    git clone git@personal:username/my-personal-project.git
    ```
