FROM php:fpm

ENV APP_USER jet
ENV APP_PATH /opt/${APP_USER}
ENV HOME_PATH /home/${APP_USER}
ENV BACKEND_PATH ${APP_PATH}/backend

WORKDIR ${BACKEND_PATH}

# Setup mysql
RUN docker-php-ext-install pdo pdo_mysql opcache > /dev/null

# Setup composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Setup ZIP
RUN \
    apt-get update > /dev/null && \
    apt-get install -y git zip unzip && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Setup user & symfony console
RUN \
    mkdir ${HOME_PATH} && \
    useradd ${APP_USER} -g users -s /bin/bash && \
    chown -R ${APP_USER}:www-data ${APP_PATH} ${HOME_PATH} && \
    echo 'alias console="php ${BACKEND_PATH}/bin/console"' >> ${HOME_PATH}/.bashrc && \
    echo 'alias phpunit="${BACKEND_PATH}/vendor/bin/phpunit ${BACKEND_PATH}"' >> ${HOME_PATH}/.bashrc

USER jet