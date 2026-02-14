# Redis Installation and Usage

## 1. Installation

```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

It'll try to start automatically, and if it fails, then:

```bash
service redis-server start  # enter system user password
service redis-server status
```

## 2. Usage with CLI

```bash
redis-cli
```
