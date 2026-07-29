# Nginx

## References

- basic & reverse proxy: https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896
- multiple domains: https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts
- SSL: https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04
- SSL: https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/
- React app on nginx: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04
- SSL `.crt` combining: https://in.godaddy.com/help/nginx-on-centos-7-install-a-certificate-27192

## Install / uninstall

- install: `apt-get install nginx`
- uninstall: `apt-get remove --purge nginx nginx-full nginx-common`

## Imp

- always use full path while creating links
- `nginx -t` test all config files
- `nginx -t -c /etc/nginx/sites-available/domain-two.com` test a custom config
- `service nginx status | start | restart | stop | reload`
- if apache2 already running / port conflict error
  - stop apache2, or:
  - `sudo fuser -k 80/tcp`
  - `sudo fuser -k 443/tcp`
  - `sudo service nginx restart`

## Lifecycle

1. nginx loads the link files in `/etc/nginx/sites-enabled`
2. those links point to the config files in `/etc/nginx/sites-available`

## Default app

- static files: `/var/www/html`
- config file: `/etc/nginx/sites-available`
- link file: `/etc/nginx/sites-enabled`
- default app files can be modified and reused for any domain name

## Custom app deployment

useful to serve different static files (html) per domain - any number of domains can share ports 80/443 and each serve a different `index.html`

steps:
1. create static file folder (if static files exist)
2. create configuration file & link file
3. start/restart nginx

eg: domain `ravinder.com`

1. static files folder (only if static files exist)
   - `/var/www/ravinder.com/html`
   - move files (mainly `index.html`) into it; for a react app, move the build folder content in

2. config file: `/etc/nginx/sites-available/ravinder.com`
   ```
   server {
     listen 80;
     listen [::]:80;

     listen 443 ssl default_server;   # remove default_server if not the default
     listen [::]:443 ssl default_server;

     ssl_certificate     /etc/nginx/ssl_files/server.crt;
     ssl_certificate_key /etc/nginx/ssl_files/server.key;
     ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
     ssl_ciphers         HIGH:!aNULL:!MD5;

     root /var/www/ravinder.com/html;   # if static files exist
     index index.html index.htm index.nginx-debian.html;
     server_name ravinder.com www.ravinder.com;

     location /api/ {
         # /api/ redirected to backend app
         proxy_pass https://localhost:5443;
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

3. create link file: `ln -sf /etc/nginx/sites-available/ravinder.com /etc/nginx/sites-enabled`
4. check config
   - `nginx -t` (checks all enabled files)
   - `nginx -t -c /etc/nginx/sites-available/ravinder.com` (checks specific file)
5. reload & restart: `service nginx reload`, `service nginx restart`

## Reverse proxy for both client & server

eg: node & react, edit `/etc/nginx/sites-available/default`

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name ravinder.com www.ravinder.com;

    location /api/ {
        proxy_pass https://localhost:5443;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        error_page 404 500 502 503 504 = @fallback;
    }

    location @fallback {
        # fixes 502 Bad Gateway on react-app restart in dev-mode
        proxy_pass http://localhost:8080;
    }
}
```
