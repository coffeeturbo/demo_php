#!/bin/bash
PROJECT_PATH=`dirname $(readlink -f $0)`
echo $CERTBOT_VALIDATION > ${PROJECT_PATH}/www/well-known/$CERTBOT_TOKEN