# Nginx Help

## Basic & Reverse Proxy

-   [Reference](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)

## Multiple Domains

-   [Reference](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts)

## SSL

-   [Create a self-signed SSL certificate](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04)
-   [Terminating SSL/HTTP](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/)
-   [Combining .crt files](https://in.godaddy.com/help/nginx-on-centos-7-install-a-certificate-27192)

## React App on Nginx

-   [Deploy a React Application with Nginx](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04)

---

## Installation & Uninstallation

### Install

```bash
apt-get install nginx
```

### Uninstall

```bash
apt-get remove --purge nginx nginx-full nginx-common
```

---

## Important Commands

-   Always use full paths when creating links.

```bash
nginx -t                                                # to test all configuration files
service nginx status | start | restart | stop | reload

nginx -t -c /etc/nginx/sites-available/domain-two.com   # to test custom configuration
```

---

## Error/Issue: If Apache2 is already running

-   Stop Apache2
-   Or run the following commands:

```bash
sudo fuser -k 80/tcp
sudo fuser -k 443/tcp
sudo service nginx restart
```

---

## Lifecycles

1.  Nginx first loads the link files from the `/etc/nginx/sites-enabled` folder.
2.  These link files are created from the configuration files in the `/etc/nginx/sites-available` folder.

---

## Default App

-   **Static files:** `/var/www/html`
-   **Configuration file:** `/etc/nginx/sites-available`
-   **Link file:** `/etc/nginx/sites-enabled`

**Note:** You can modify the default app files and use them for any domain name.

---

## Custom App Deployment

This is useful when you want to serve different static files (HTML) for different domain names. You can use any number of domains. On request, all domain names with the default port (80/443) will serve a different app (index.html).

i.e., `http://ravinder.com` and `http://ravinder.reddy.com` will serve different apps (index.html).

### Steps

1.  Create a static file folder (if static files exist).
2.  Create a configuration file and a link file.
3.  Start/restart Nginx.

**Example:** domain name = `ravinder.com`

1.  **Create static files folder (only if static files exist):**

    `/var/www/ravinder.com/html` (create this folder)

    -   Move all files into the `html` folder, mainly `index.html` (entry file).
    -   If it is a React app, build the app and then move the build folder content to the `html` folder.
    -   Or, if you want to keep static files in any other folder, you can do so, but you need to point to the folder properly.

2.  **Create a configuration file under `/etc/nginx/sites-available`:**

    `/etc/nginx/sites-available/ravinder.com` (create this file)

    Add the following content to the file:

    ```nginx
    server {
      listen 80;
      listen [::]:80;

      # SSL configuration
      listen 443 ssl default_server;   # remove default_server if this is not default
      listen [::]:443 ssl default_server;

      ssl_certificate     /etc/nginx/ssl_files/server.crt;
      ssl_certificate_key /etc/nginx/ssl_files/server.key;
      ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
      ssl_ciphers         HIGH:!aNULL:!MD5;

      # if static files exists
      root /var/www/ravinder.com/html;
      # root /home/ravinder/Drive/work-spaces/office/durvah/mvbri-client/build

      index index.html index.htm index.nginx-debian.html;

      server_name ravinder.com www.ravinder.com;

      location /api/ {
          # /api/ will be redirected to the backend app
          proxy_pass https://localhost:5443; #whatever port your app runs on
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }

      location / {
          # other than /api serve index.html
          try_files $uri /index.html;
      }
    }
    ```

3.  **Generate link files under `/etc/nginx/sites-enabled`:**

    Use the following command to generate the link file:

    ```bash
    ln -sf /etc/nginx/sites-available/ravinder.com /etc/nginx/sites-enabled
    ```

4.  **Check the configuration files:**

    ```bash
    nginx -t  # checks all the enabled files (i.e., files under /etc/nginx/sites-enabled)
    ```

    ```bash
    nginx -t -c /etc/nginx/sites-available/ravinder.com   # to check a specific file
    ```

5.  **Reload & restart:**

    ```bash
    service nginx reload
    service nginx restart
    ```

---

## React App & Backend API Configuration

```nginx
server {
  listen 80;
  listen [::]:80;

  # SSL configuration
  #
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;
  ssl_certificate     /etc/nginx/ssl_files/server.crt;
  ssl_certificate_key /etc/nginx/ssl_files/server.key;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;

  root /var/www/ravinder.com/html;  ## move react app build folder content to this html folder
  # root /home/ravinder/Drive/work-spaces/office/durvah/mvbri-client/build

  index index.html index.htm index.nginx-debian.html;

  server_name ravinder.com www.ravinder.com;

  location /api/ {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    # try_files $uri $uri/ =404;

    proxy_pass https://localhost:5443; #whatever port your app runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    try_files $uri /index.html;
  }
}
```

---

## Reverse Proxy for Both Client & Server

e.g., Node & React

Edit `/etc/nginx/sites-available/default`

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name ravinder.com www.ravinder.com;

    location /api/ {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        # try_files $uri $uri/ =404;

        proxy_pass https://localhost:5443; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:8080; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        error_page 404 500 502 503 504 = @fallback;
    }

    location @fallback {
        proxy_pass http://localhost:8080;  # this is to fix 502: Bad gateway error on react-app restart in dev-mode
    }
}
```
