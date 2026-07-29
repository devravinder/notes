# SSL certificate setup (node-express)

self-certified and CA (certificate authority)

- `hostname -I` to see ip address

steps:
1. generate private key (`file.key` or `key.pem`)
2. generate CSR - certificate signing request (`file.csr` or `csr.pem`)
3. generate certificate file (`file.crt` or `crt.pem`)

## Generating private key

- `openssl genrsa -out server.key`

## Generating CSR

- generate using the private key: `openssl req -new -key server.key -out server.csr`
- give correct host name for "common Name (e.g. server FQDN or YOUR name)": `localhost`

## Generating certificate

- self certified: `openssl x509 -req -days 9999 -in server.csr -signkey server.key -out server.crt`
- or upload the CSR to a CA (eg GoDaddy), they'll give back `certificate.crt`, `certificate.pem`, and a chain file like `gd_bundle-g2-g1.crt`

## Same with `.pem` extension

- `openssl genrsa -out key.pem`
- `openssl req -new -key key.pem -out csr.pem`
- `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`
- `rm csr.pem` (optional)

## Other ways & references

- https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
- with sudo: https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04
  - `sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`
- https://flaviocopes.com/express-https-self-signed-certificate/
