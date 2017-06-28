[![Build Status](https://travis-ci.com/proyoozer/jet.svg?token=yys6KUYUYyp7otrPkJzx&branch=master)](https://travis-ci.com/proyoozer/jet)

# JET: Angular & Symfony application
## Deploy

#### Required to deploy:

| Software  | Download link                 |
|----------:|------------------------------:|
| Docker    | https://www.docker.com/       |
| Node      | https://nodejs.org/en/        |
| Git       | https://git-scm.com/downloads |

#### Execute this to deploy the project:
```bash
# Basic setup
setup.sh

# Generating jwt ssl cert 
docker-compose exec php bash # go into php container
mkdir var/jwt
# Passphrase must by same %jwt_key_pass_phrase% (parameters.yml) 
openssl genrsa -out var/jwt/private.pem -passout pass:12345678 -aes256 4096
openssl rsa -pubout -in var/jwt/private.pem -passout pass:12345678 -out var/jwt/public.pem
exit # exit from container

# Build frontend app
cd src/frontend/
npm run dev
```

## API Reference
API docs are located at **/api/doc** route and provided via Swagger.