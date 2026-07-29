# PostgreSQL

refs: https://www.postgresql.org/download/linux/ubuntu/, https://itsfoss.com/install-postgresql-ubuntu/

## Installation

1. add postgresql official repo: create `/etc/apt/sources.list.d/pgdg.list` with
   ```
   deb http://apt.postgresql.org/pub/repos/apt/ focal-pgdg main
   ```
2. import repo signing key & update
   - `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`
   - `sudo apt-get update`
3. install: `sudo apt install postgresql postgresql-contrib`
   - creates default user `postgres` with no password, default db `postgres`
   - after install it shows: version(Ver), Cluster, Port, Status, Owner, Data directory, Log file
4. GUI (optional): `sudo apt install pgadmin4`
5. creating users
   - login with default user: `sudo su postgres`
   - `psql` to enter sql mode
   - set postgres user password: `ALTER USER postgres WITH PASSWORD 'some_password';`
   - `CREATE USER ravinder WITH PASSWORD 'my_password';` (password in single quotes)
   - `ALTER USER ravinder WITH SUPERUSER;`
   - new user can access via pgadmin4 but not yet from command line
6. allow other users from command line
   - `nano /etc/postgresql/12/main/pg_hba.conf` (any editor, matching installed version)
   - change `local all postgres peer` to `local all postgres all`
   - restart: `sudo service postgresql restart`
7. login: `psql -U ravinder -d postgres` (`psql -U user_name -d db_name`)

## Basic commands

- `service postgresql` shows available commands
- `service postgresql start|stop|restart|reload|force-reload|status`
- `systemctl disable postgresql` disable auto start on boot
- `systemctl enable postgresql` enable auto start on boot

## psql commands

- `\psql` enter psql mode
- `\l` list all databases
- `\q` quit
- `\?` help
- `\du` database users
- `psql -U user_name -d db_name` login
- `DROP USER ravinder;`
- `CREATE USER ravinder WITH PASSWORD 'my_password';`
- `ALTER USER ravinder WITH SUPERUSER;`
- `pg_lsclusters` see database cluster details
