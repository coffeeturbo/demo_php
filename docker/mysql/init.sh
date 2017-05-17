#!/usr/bin/env bash

######                                                                            ######
#                   Этот файл инклудится из docker-entrypoint.sh                       #
#              контейнера mysql и использует его переменные и функции                  #
#  https://github.com/docker-library/mysql/blob/master/5.7/docker-entrypoint.sh 177:9  #
######                                                                            ######

file_env 'MYSQL_TEST_DATABASE'

if [ "$MYSQL_TEST_DATABASE" ]; then
    echo "GRANT ALL ON \`$MYSQL_TEST_DATABASE\`.* TO '$MYSQL_USER'@'%' ;" | "${mysql[@]}"
    echo 'FLUSH PRIVILEGES ;' | "${mysql[@]}"
fi