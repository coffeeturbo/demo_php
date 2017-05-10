#!/usr/bin/env bash
cd `dirname $0/..`

read -p "DB_ROOT_PASS: " DB_ROOT_PASS
read -p "DB_NAME: " DB_NAME
read -p "DB_USER: " DB_USER
read -p "DB_PASS: " DB_PASS

echo DB_ROOT_PASS=${DB_ROOT_PASS} > .env
echo DB_NAME=${DB_NAME} >> .env
echo DB_USER=${DB_USER} >> .env
echo DB_PASS=${DB_PASS} >> .env
