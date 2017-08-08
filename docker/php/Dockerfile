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


# Setup GD
RUN apt-get update && \
            apt-get install -y libfreetype6-dev libjpeg62-turbo-dev && \
            docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/  &&  \
            docker-php-ext-install gd

# Setup user & symfony console
RUN \
    mkdir ${HOME_PATH} /opt/vendor && \
    useradd ${APP_USER} -g users -s /bin/bash && \
    chown -R ${APP_USER}:www-data ${APP_PATH} ${HOME_PATH} /opt/vendor && \
    echo 'alias console="php ${BACKEND_PATH}/bin/console"' >> ${HOME_PATH}/.bashrc && \
    echo 'alias phpunit="cd ${BACKEND_PATH} && vendor/bin/phpunit"' >> ${HOME_PATH}/.bashrc && \
    echo 'alias migrate="console doctrine:schema:update --force"' >> ${HOME_PATH}/.bashrc

RUN echo "upload_max_filesize = 20M\n" > /usr/local/etc/php/conf.d/jet.ini

USER jet