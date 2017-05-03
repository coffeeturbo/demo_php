FROM php:7.1-fpm
MAINTAINER Viacheslav  <coffeeturbo@gmail.com>

RUN docker-php-ext-install pdo pdo_mysql opcache

RUN echo 'alias sf3="php bin/console"' >> ~/.bashrc

# Setup composer

RUN curl -o /tmp/composer-setup.php https://getcomposer.org/installer \
 && curl -o /tmp/composer-setup.sig https://composer.github.io/installer.sig \
 # Make sure we're installing what we think we're installing!
 && php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }" \
 && php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer --snapshot \
 && rm -f /tmp/composer-setup.*

# SETUP GIT
RUN apt-get update && apt-get install -y git \
&& apt-get install -y zip unzip \
&& apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /src