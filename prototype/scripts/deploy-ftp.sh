#!/bin/bash

# This script deploys files to a remote FTP server. To use it, change
# package.json to run deploy-ftp.sh rather than deploy-ssh.sh. You may need to
# install lftp to make this script work. Do so by running:
# brew install lftp

source .env

if [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_REMOTE_PATH" ] || [ -z "$DEPLOY_PWD" ]; then
    echo "Deploy variables are undefined. Did you forget the .env file?"
    exit 1
fi

lftp -c "set ssl:verify-certificate no;
set ssl:check-hostname no;
open ftp://$DEPLOY_HOST --user $DEPLOY_USER --password $DEPLOY_PWD;
lcd ./public/;
cd $DEPLOY_REMOTE_PATH;
mirror --reverse --verbose"
