# SSH: multiple keys for the same host

refs: https://gist.github.com/oanhnn/80a89405ab9023894df7, https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/, https://betterprogramming.pub/how-to-set-up-multiple-ssh-keys-ae6688f76570, https://stackoverflow.com/questions/2419566/best-way-to-use-multiple-ssh-private-keys-on-one-client

eg: one ssh key for work, another for personal

1. generate both keys
   - `ssh-keygen -t rsa` (default path `~/.ssh`)
   - `ssh-keygen -t rsa` (different path, eg `~/.ssh2`)
2. add alias host names in `~/.ssh/config`
   ```
   Host work
     HostName bitbucket.org
     IdentityFile ~/.ssh/id_rsa
     User git

   Host personal
     HostName bitbucket.org
     IdentityFile ~/.ssh2/id_rsa
     User git
   ```
3. add private keys to ssh-agent (default one is added automatically)
   - `ssh-add ~/.ssh2/id_rsa`
4. use the alias while cloning
   - instead of: `git clone git@bitbucket.org:username/my-work-project.git`
   - use: `git clone git@work:username/my-work-project.git`
   - and: `git clone git@personal:username/my-personal-project.git`
