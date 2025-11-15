# AWS Notes and Resources

This document contains a collection of notes, links, and commands related to various AWS services.

## Quick Links

-   [CodeDeploy Agent Installation](./codedeploy.md)
-   [Mounting an EBS Volume](./ebs.md)

## AWS CLI Setup

1.  **Install the AWS CLI** on your local machine.
2.  **Configure the CLI** with your credentials by running:
    ```bash
    aws configure
    ```
    You will be prompted to enter your AWS Access Key ID, Secret Access Key, default region, and output format.

## AWS Services Overview

This is a list of AWS services that have been used or explored:

-   **Compute**:
    -   EC2 (Elastic Compute Cloud)
    -   ECS (Elastic Container Service)
    -   ECR (Elastic Container Registry)
    -   Lambda
-   **Storage**:
    -   S3 (Simple Storage Service)
    -   EBS (Elastic Block Store)
-   **Database**:
    -   DynamoDB
-   **Networking & Content Delivery**:
    -   VPC (Virtual Private Cloud)
    -   Route 53 / CloudMap
    -   CloudFront
    -   Application Load Balancer (ALB)
-   **Developer Tools**:
    -   CodeCommit (Git repository)
    -   CodeDeploy
-   **Management & Governance**:
    -   CloudWatch (Monitoring and Logging)
    -   IAM (Identity and Access Management) - Policies, Roles
-   **Frontend & Mobile**:
    -   Amplify
    -   Cognito

## Tutorials and Guides

Here are links to tutorials that have been implemented or are worth exploring.

### Implemented

-   **Serverless Web App**: [Link](https://s3.console.aws.amazon.com/s3/buckets/wildrydes-us-east-1/WebApplication/?region=us-east-1&tab=overview)
-   **Static Site Hosting**: [Link](https://awstip.com/aws-static-website-hosting-with-s3-route-53-cloud-front-through-a-custom-domain-5dbcc4a6c27)
-   **VPC Creation**: [Link](https://awstip.com/aws-vpc-creation-f3e456b3f395)
-   **Microservices with ECS**:
    -   [Getting Started Guide](https://aws.amazon.com/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/module-two/)
    -   [Medium Article](https://medium.com/swlh/microservices-with-aws-ecs-58dd5006ab2e)
    -   [ECS Workshop](https://ecsworkshop.com/microservices/nodejs/)
-   **CI/CD with Bitbucket Pipelines**:
    -   [Deploy to Amazon ECS](https://support.atlassian.com/bitbucket-cloud/docs/deploy-to-amazon-ecs/)
    -   [Configure bitbucket-pipelines.yml](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/)
-   **Microservices, ECS, CI/CD & Load Balancer**:
    -   [ALB with ECS](https://www.bogotobogo.com/DevOps/AWS/aws-ELB-ALB-Application-Load-Balancer-ECS.php)
    -   [Bitbucket and AWS ECS](https://dev.to/olaoluwa98/easy-deployment-setup-with-bitbucket-and-aws-ecs-46ac)
    -   [YouTube Tutorial](https://www.youtube.com/watch?v=lCWy1sXU79E)

## Troubleshooting

### AWS Policy Generator

A useful tool for creating IAM policies: [AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)

### ECR Docker Login Error

**Error**: `Cannot perform an interactive login from a non TTY device`

This can happen when piping the password to `docker login`.

**Incorrect Command**:
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-south-1.amazonaws.com
```

**Correct Command**:
Use command substitution instead of a pipe.
```bash
docker login -u AWS -p $(aws ecr get-login-password --region <your-region>) <account_id>.dkr.ecr.<your-region>.amazonaws.com
```
**Example**:
```bash
docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 759921771567.dkr.ecr.ap-south-1.amazonaws.com
```
