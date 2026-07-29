# Redis

## Installation

- `curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg`
- `echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list`
- `sudo apt-get update`
- `sudo apt-get install redis`
- if it fails to start automatically
  - `service redis-server start` (enter system user password)
  - `service redis-server status`

## Usage

- `redis-cli`
