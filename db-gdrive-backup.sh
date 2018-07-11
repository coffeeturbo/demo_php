#!/usr/bin/env bash
export $(egrep -v '^#' .env | xargs)

RETURN_CODE=0
FILE=jet-`date +%Y-%m-%d`.sql.gz

if [ ! -e "/usr/bin/gdrive" ]
then
    echo "Error: Install gdrive first!"
fi

if [ -z ${GDRIVE_FOLDER_ID} ] || [ -z ${DB_USER} ] || [ -z ${DB_PASS} ] || [ -z ${DB_NAME} ]
then 
    echo "Error: GDRIVE_FOLDER_ID or DB_USER or DB_PASS or DB_NAME is empty"; 
fi;

if [ ${RETURN_CODE} -eq 0 ]
then
   exit ${RETURN_CODE}
fi;

docker-compose exec mysql /usr/bin/mysqldump -u ${DB_USER} --password=${DB_PASS} ${DB_NAME} | gzip > ${FILE}

OLDFILE=`gdrive list --no-header --query "'${GDRIVE_FOLDER_ID}' in parents and trashed = false" | grep ${FILE} | awk '{ print $1}'`

if [ -n "$OLDFILE" ]; then
  gdrive delete $OLDFILE -r
fi 

gdrive upload --parent ${GDRIVE_FOLDER_ID} --delete ${FILE}