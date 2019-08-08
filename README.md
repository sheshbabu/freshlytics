# Freshlytics

Open source privacy-friendly analytics

## Screenshots

Home
![Screenshot](./docs/home.png)

Login
![Screenshot](./docs/login.png)

## Local development

Install `docker` and `docker-compose`

Start the containers

```shell
$ docker-compose up --build
```

Migrate and seed the database

```shell
$ docker-compose run freshlytics npm run migrate
$ docker-compose run freshlytics npm run seed
```

Optional: seed the data with test values

```shell
$ docker-compose run freshlytics npm run seed:test
```

## Production

```shell
$ docker-compose -f docker-compose.yml up
$ docker-compose run freshlytics npm run migrate
$ docker-compose run freshlytics npm run seed
```
