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

# setup intl extension
RUN apt-get update \
  && apt-get install -y zlib1g-dev libicu-dev g++ \
  && docker-php-ext-configure intl \
  && docker-php-ext-install intl

# Setup user & symfony console
RUN \
    mkdir ${HOME_PATH} && \
    useradd ${APP_USER} -g users -s /bin/bash && \
    chown -R ${APP_USER}:www-data ${APP_PATH} ${HOME_PATH} && \
    echo 'alias console="php ${BACKEND_PATH}/bin/console"' >> ${HOME_PATH}/.bashrc && \
    echo 'alias phpunit="cd ${BACKEND_PATH} && vendor/bin/phpunit"' >> ${HOME_PATH}/.bashrc && \
    echo 'alias migrate="console doctrine:schema:update --force"' >> ${HOME_PATH}/.bashrc

RUN echo "upload_max_filesize = 20M\n" > /usr/local/etc/php/conf.d/jet.ini

# setup mailer
RUN apt-get update && apt-get install -q -y ssmtp mailutils && rm -rf /var/lib/apt/lists/*
RUN echo "hostname=localhost.localdomain" > /etc/ssmtp/ssmtp.conf
RUN echo "root=info@topicoff.com" >> /etc/ssmtp/ssmtp.conf
RUN echo "mailhub=maildev" >> /etc/ssmtp/ssmtp.conf

RUN echo "sendmail_path=sendmail -i -t" >> /usr/local/etc/php/conf.d/php-sendmail.ini

RUN echo "localhost localhost.localdomain" >> /etc/hosts

USER jet