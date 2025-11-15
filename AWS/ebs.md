# Mounting an EBS Volume to an EC2 Instance

This document provides a reference for attaching and mounting an Amazon EBS (Elastic Block Store) volume to an EC2 instance.

## Tutorial

For a detailed, step-by-step guide on how to mount an EBS volume, please refer to the following tutorial:

[**How To Mount an EBS Volume on an EC2 Instance**](https://devopscube.com/mount-ebs-volume-ec2-instance/)

The process generally involves:

1.  **Creating an EBS volume** in the AWS console.
2.  **Attaching the volume** to your target EC2 instance.
3.  **Connecting to your EC2 instance** via SSH.
4.  **Finding the device name** for the attached volume (e.g., `/dev/sdf`).
5.  **Checking if the volume has a file system.**
6.  **Formatting the volume** with a file system (e.g., `ext4`) if it doesn't have one.
7.  **Creating a mount point** (a directory) on your instance.
8.  **Mounting the volume** to the created mount point.
9.  **Configuring auto-mounting** on system reboot by editing the `/etc/fstab` file.
