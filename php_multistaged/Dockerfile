FROM php:8.3-cli-alpine AS vendor

RUN apk add --no-cache unzip git curl bash libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:2.7.2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .  

RUN composer install --no-dev --no-interaction --prefer-dist



RUN composer install --no-dev --no-interaction --prefer-dist



FROM node:20-alpine AS frontend

WORKDIR /app
COPY package*.json ./


RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    bash \
    libzip-dev \
    zip \
    unzip \
    curl \
    nginx \
    supervisor \
    && docker-php-ext-install pdo pdo_mysql zip

WORKDIR /var/www

COPY . .

COPY --from=vendor /app/vendor /var/www/vendor
COPY --from=frontend /app/public /var/www/public
COPY --from=frontend /app/build /var/www/build


RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

EXPOSE 9000

CMD ["php-fpm"]
