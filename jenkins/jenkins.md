# Jenkins Installation and Management

## References

- [How to Install Jenkins on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-18-04)
- [How to Start, Stop, or Restart your Instance](https://support.cloudbees.com/hc/en-us/articles/216118748-How-to-Start-Stop-or-Restart-your-Instance-)

## Installation

```bash
wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins
```

## Starting Jenkins

```bash
sudo systemctl start jenkins
sudo systemctl status jenkins   # to see status
```

## Opening the Firewall

(install ssh)

```bash
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw allow 8080
sudo ufw status
```

## Setting Up Jenkins

1.  Open your browser and navigate to `http://your_server_ip_or_domain:8080`.
2.  To get the initial admin password, run the following command:

    ```bash
    sudo cat /var/lib/jenkins/secrets/initialAdminPassword
    ```

3.  Follow the instructions in the DigitalOcean blog for security (SSL).

## Status, Start, Stop, Restart

```bash
sudo systemctl status jenkins.service
sudo systemctl start jenkins.service
sudo systemctl stop jenkins.service
sudo systemctl restart jenkins.service
```

## Auto start at boot time

```bash
sudo systemctl disable jenkins.service
sudo systemctl enable jenkins.service   # by default it is enabled
```
