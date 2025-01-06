#!/bin/bash

################################################################
##
##   EC2 Instance files moving To Amazon S3
##   Written By: Chandra
################################################################

NOW=$(date +"%Y-%m-%d")

BACKUP_DIR="/root/backup"

AMAZON_S3_BUCKET="s3://mvbri-prod/prod/"

FOLDERS_TO_BACKUP=("/root/live/mvbri-backend/content")

#################################################################

# backup any folders


 tar -cvzf ${BACKUP_DIR}/backup-files-${NOW}.tar.gz ${FOLDERS_TO_BACKUP[@]}


#upload_s3

 aws s3 sync ${BACKUP_DIR} ${AMAZON_S3_BUCKET}

#Delete 7 Days older

find /root/backup -name "*.tar.gz" -type f -mtime +7 -exec rm -f {} \;
