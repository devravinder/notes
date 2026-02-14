
# SSL Certificate Setup with Node-Express  

(Self Certified and Certificate Authority (CA))

---

## 📌 Check IP Address

```bash
hostname -I   ## to see IP address
```

---

## 🔐 SSL Certificate Setup Steps

### 1. Generate Private Key  

→ `file.key` or `key.pem`

### 2. Generate CSR (Certificate Signing Request)  

→ `file.csr` or `csr.pem`

### 3. Generate Certificate File  

→ `file.crt` or `cert.pem`

---

## 🔑 Step 1: Generate Private Key

```bash
openssl genrsa -out server.key
```

---

## 📄 Step 2: Generate CSR

Generate CSR file using private key:

```bash
openssl req -new -key server.key -out server.csr
```

Note:

- Give correct hostname  
- Example:

```bash
Common Name (e.g. server FQDN or YOUR name) []: localhost
```

---

## 📜 Step 3: Generate Certificate File

Generate certificate using CSR file.

### a. Self Certified

```bash
openssl x509 -req -days 9999 -in server.csr -signkey server.key -out server.crt
```

---

### b. Using Certificate Authority (CA)

Upload `server.csr` to an SSL provider (e.g., GoDaddy).

They will provide:

- `certificate.crt`      → Main certificate  
- `certificate.pem`  
- `gd_bundle-g2-g1.crt`  → Chain files  

---

## 🔁 Alternative Using `.pem` Extensions

```bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

Optional cleanup:

```bash
rm csr.pem
```

---

## Other Methods & References

### 1. Official Node.js Documentation

<https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/>

---

### 2. DigitalOcean (Run with sudo)

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

Reference:  

- [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04)

---

### 3. Express HTTPS Guide

- [Ref](https://flaviocopes.com/express-https-self-signed-certificate/)
