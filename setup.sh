#!/bin/bash

setup_docker() {
    cd ${PROJECT_PATH}
    
    type docker-compose >/dev/null 2>&1 || { echo >&2 "Required docker-compose but it's not installed. Aborting."; exit 1;}
    
    if [ "${quite}" != "1" ]; then
        read -p "Generate .env file? [y]: " is_generage_env
    fi
    is_generage_env=${is_generage_env:-y}
    
    if [ "$is_generage_env" == "y" ]; then
        echo ""
        echo "Envirment setup."
        echo ""
        read -p "DB_ROOT_PASS: " DB_ROOT_PASS
        read -p "DB_NAME: " DB_NAME
        read -p "DB_USER: " DB_USER
        read -p "DB_PASS: " DB_PASS

        echo DB_ROOT_PASS=${DB_ROOT_PASS:rootpass} > .env
        echo DB_NAME=${DB_NAME:db} >> .env
        echo DB_USER=${DB_USER:db_user} >> .env
        echo DB_PASS=${DB_PASS:db_pass} >> .env
    fi
    
    docker-compose build
    docker-compose up -d
}

build_backend() {
    if [ "${quite}" != "1" ]; then
        read -p "Do you want run composer install? [y]: " is_composer_install
    fi
    
    if [ ${is_composer_install:-y} == "y" ]; then
        cd ${PROJECT_PATH}/src/backend
        echo "Execute composer install...!"
        docker run --rm -v $(pwd):/app composer/composer install
    fi
}

build_frontend() {
    if [ "${quite}" != "1" ]; then
        read -p "Do you want build Angular? [y]: " angular2_buuld
    fi

    if [ ${angular2_buuld:-y} == "y" ]; then
        cd ${PROJECT_PATH}/src/frontend
        echo "Execute angular2 install...!"
    fi
}

help() {
    cat << EOF


                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/
    
      #######################################
      #                                     #
      # Welcome to setup of docker project. #
      #      Use -y flag to quite mode      #
      #                                     #
      #######################################
EOF
}

PROJECT_PATH=`dirname $(readlink -f $0)`

# Get parameters
while [ "$1" != "" ]; do
    case $1 in
        -y | --yes )    quite=1
                        ;;
        * )             help
                        exit 1
    esac
    shift
done


setup_docker
build_backend
build_frontend