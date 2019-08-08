<p align="center"><img src="https://raw.githubusercontent.com/sheshbabu/freshlytics/master/docs/title.png" /></p>

<p align="center">Open source privacy-friendly analytics</p>

## Screenshots

![Screenshot](./docs/home.png)

<p align="center">Home</p>

![Screenshot](./docs/login.png)

<p align="center">Login</p>

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
