# PostgreSQL Installation and Usage

**References:**

-   [PostgreSQL - Linux downloads (Ubuntu)](https://www.postgresql.org/download/linux/ubuntu/)
-   [How to Install PostgreSQL on Ubuntu](https://itsfoss.com/install-postgresql-ubuntu/)

---

## System PostgreSQL Details

```
Ver Cluster Port Status Owner    Data directory              Log file
13  main    5432 down   postgres /var/lib/postgresql/13/main /var/log/postgresql/postgresql-13-main.log
```

---

## Installation

### Method 1

1.  **Adding PostgreSQL official repo to our sources list**

    Create the file `/etc/apt/sources.list.d/pgdg.list` and add a line for the repository:

    ```
    deb http://apt.postgresql.org/pub/repos/apt/ focal-pgdg main
    ```

2.  **Import the repository signing key, and update the package lists**

    ```bash
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    ```

3.  **Installing**

    ```bash
    sudo apt install postgresql postgresql-contrib
    ```

    After installation, it'll give all the basic details like version, cluster, port, status, owner, data directory, and log file.

    Example:

    ```
    Ver Cluster Port Status Owner    Data directory              Log file
    12  main    5432 down   postgres /var/lib/postgresql/12/main /var/log/postgresql/postgresql-12-main.log
    ```

    It creates a default user `postgres` with no password and a default database `postgres`.

4.  **GUI (optional)**

    ```bash
    sudo apt install pgadmin4
    ```

    After creating another user, we can access pgadmin4. To access the GUI, go to all programs and click on pgadmin4.

5.  **Creating users**

    Login with the default user (`postgres`):

    ```bash
    sudo su postgres
    psql      // enter sql mode
    ```

    We can set a password for the `postgres` user:

    ```sql
    ALTER USER postgres WITH PASSWORD 'some_password';
    ```

    Create a new user:

    ```sql
    CREATE USER ravinder WITH PASSWORD 'my_password';
    -- note password in single quote
    ```

    Add a role to the new user:

    ```sql
    ALTER USER ravinder WITH SUPERUSER;
    ```

    Now the new user can access from pgadmin4, but can't from the command line.

6.  **Allowing other users to access the DB from the command line**

    ```bash
    nano /etc/postgresql/12/main/pg_hba.conf      // any editor & installed version
    ```

    Change `peer` to `all`:

    ```
    local   all             postgres                                peer
    ```

    to

    ```
    local   all             postgres                                all
    ```

    Then restart:

    ```bash
    sudo service postgresql restart
    ```

7.  **To login**

    ```bash
    psql -U ravinder -d postgres   // psql -U user_name -d db_name
    ```

---

## Basic Commands for PostgreSQL

```bash
service postgresql   // gives basic available commands
service postgresql start|stop|restart|reload|force-reload|status
systemctl disable postgresql  // disable auto start on boot
systemctl enable postgresql   // enable auto start on boot
```

---

## psql Commands

| Command | Description |
| :--- | :--- |
| `\psql` | to enter in psql mode |
| `\l` | list all tables |
| `\q` | quit |
| `\?` | help |
| `\du` | data base users |
| `psql -U user_name -d db_name` | to login |
| `DROP USER ravinder;` | to drop user |
| `CREATE USER ravinder WITH PASSWORD 'my_password';` | create user |
| `ALTER USER ravinder WITH SUPERUSER;` | adding role |
| `pg_lsclusters` | to see databse details |
