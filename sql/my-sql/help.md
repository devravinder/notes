# MySQL Help

**Reference:** [How To Install MySQL on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)

## Installation

```bash
sudo apt install mysql-server
sudo mysql_secure_installation    // optional for additional settings
```

---

## User Management

### See Database Users

```sql
SELECT user,authentication_string,plugin,host FROM mysql.user;
```

### Allow Connection with Client App

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### Allow Connection Only from CMD

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket BY 'password';
```

---

## Controlling MySQL

### Basic Commands

```bash
service mysql   // gives basic available commands
service mysql start|stop|restart|reload|force-reload|status
```

### Auto Start on Boot

```bash
systemctl disable mysql  // disable auto start on boot
systemctl enable mysql   // enable auto start on boot
```

---

## Login

```bash
mysql -u root -p
// enter password on prompt
```

---

## Backup & Restore

### Backup

```bash
mysqldump -u root -p db_instance > backup.sql
// enter password on prompt

-- different server
mysqldump -h 127.0.0.1 -u root -p db_instance > backup.sql
```

### Restore

First, create the `db_instance` manually.

```bash
mysql -u root -p durvah_portal < backup.sql

---  different server
mysql -h 127.0.0.1 -u root -p durvah_portal < backup.sql
```

---

## Allowing Remote Connection

[MySQL Remote Connection](https://phoenixnap.com/kb/mysql-remote-connection)

---

## Dev Database Variables

```
process.env.DB_INSTANCE = "durvah_portal"
process.env.DB_USER = "durvah_intra"
process.env.DB_PWD = "your_password"
process.env.DB_DIALECT = "mysql"
```
