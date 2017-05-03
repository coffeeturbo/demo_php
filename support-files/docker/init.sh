#!/bin/bash

cp ./build/docker-compose.yml ../../docker-compose.yml
docker-compose build
docker-compose up -d
