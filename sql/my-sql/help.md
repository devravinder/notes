# MySQL

ref: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04

## Install

- `sudo apt install mysql-server`
- `sudo mysql_secure_installation` (optional, additional settings)

## Users

- see database users: `SELECT user,authentication_string,plugin,host FROM mysql.user;`
- allow connecting from a client app: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; FLUSH PRIVILEGES;`
- allow connecting only from cmd: `ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket BY 'password';`

## Controlling the service

- `service mysql` shows available commands
- `service mysql start|stop|restart|reload|force-reload|status`
- `systemctl disable mysql` disable auto start on boot
- `systemctl enable mysql` enable auto start on boot

## Login

- `mysql -u root -p` (enter password on prompt)

## Backup & restore

- backup: `mysqldump -u root -p db_instance > backup.sql`
- backup from a different server: `mysqldump -h 127.0.0.1 -u root -p db_instance > backup.sql`
- restore (create the db manually first): `mysql -u root -p durvah_portal < backup.sql`
- restore on a different server: `mysql -h 127.0.0.1 -u root -p durvah_portal < backup.sql`

## Remote connection

- ref: https://phoenixnap.com/kb/mysql-remote-connection
