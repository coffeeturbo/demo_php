#!/usr/bin/env bash

file_env 'MYSQL_TEST_DATABASE'
file_env 'MYSQL_USER'

if [ "$MYSQL_TEST_DATABASE" ]; then
    echo "GRANT ALL ON \`$MYSQL_TEST_DATABASE\`.* TO '$MYSQL_USER'@'%' ;" | "${mysql[@]}"
    echo 'FLUSH PRIVILEGES ;' | "${mysql[@]}"
fi