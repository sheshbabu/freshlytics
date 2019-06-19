# Raylight

Open source privacy-friendly analytics

## Screenshots

Home

![Screenshot](./docs/home.png)

Login

![Screenshot](./docs/login.png)

## Local development

Prerequisites:

- Install `docker` and `docker-compose`

Start the containers

```shell
$ docker-compose up -d
```

## Production

```shell
$ docker-compose -f docker-compose.yml up
$ docker-compose run raylight npm run migrate
$ docker-compose run raylight npm run seed
```
