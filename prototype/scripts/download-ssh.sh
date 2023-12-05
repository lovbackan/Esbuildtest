#!/bin/bash
source .env

if [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_REMOTE_PATH" ] || [ -z "$DEPLOY_PWD" ]; then
    echo "Deploy variables are undefined. Did you forget the .env file?"
    exit 1
fi

rsync=$(cat <<DEPLOY
spawn rsync -a --progress --delete $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_REMOTE_PATH/ ./backup/

expect_before "*(yes/no)?" {
    send "yes\n"
}

expect "password:"
send "$DEPLOY_PWD\n"
expect eof

if [catch wait] {
    puts "rsync failed"
    exit 1
}

exit 0
DEPLOY
)

echo "$rsync" | expect -
