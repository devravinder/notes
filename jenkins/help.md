# Jenkins

refs: https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-18-04, https://support.cloudbees.com/hc/en-us/articles/216118748-How-to-Start-Stop-or-Restart-your-Instance-

## Installation

- `wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -`
- `sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`
- `sudo apt update`
- `sudo apt install jenkins`

## Starting jenkins

- `sudo systemctl start jenkins`
- `sudo systemctl status jenkins`

## Opening the firewall

- install ssh first
- `sudo ufw allow OpenSSH`
- `sudo ufw enable`
- `sudo ufw allow 8080`
- `sudo ufw status`

## Setting up jenkins

- open `http://your_server_ip_or_domain:8080` in browser
- initial admin password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
- for SSL setup follow the digitalocean blog

## Status / start / stop / restart

- `sudo systemctl status jenkins.service`
- `sudo systemctl start jenkins.service`
- `sudo systemctl stop jenkins.service`
- `sudo systemctl restart jenkins.service`

## Auto start at boot

- `sudo systemctl disable jenkins.service`
- `sudo systemctl enable jenkins.service` (enabled by default)
