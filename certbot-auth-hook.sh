#!/bin/bash
PROJECT_PATH=`dirname $(readlink -f $0)`
echo $CERTBOT_VALIDATION > ${PROJECT_PATH}/src/web/.well-known/acme-challenge/$CERTBOT_TOKEN