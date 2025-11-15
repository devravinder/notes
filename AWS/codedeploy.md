# AWS CodeDeploy Agent Installation

This document provides the command to download and install the AWS CodeDeploy agent on a server.

## Installation Command

You can use `wget` to download the CodeDeploy agent installer from the appropriate S3 bucket for your region.

### Generic Command

```bash
wget https://<bucket-name>.s3.<region-identifier>.amazonaws.com/latest/install
```

Replace `<bucket-name>` and `<region-identifier>` with the correct values for your AWS region.

### Example for us-east-2 (Ohio)

```bash
wget https://aws-codedeploy-us-east-2.s3.us-east-2.amazonaws.com/latest/install
```

After downloading the `install` script, you will need to make it executable and run it to complete the agent installation.

```bash
chmod +x ./install
sudo ./install auto
```
