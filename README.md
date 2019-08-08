<p align="center"><img src="https://raw.githubusercontent.com/sheshbabu/freshlytics/master/docs/title.png" /></p>

Freshlytics is an open source privacy-friendly analytics software. It aims to be reliable, friendly to use and easy to deploy.

## Screenshots

Home
![Screenshot](./docs/home.png)

Login
![Screenshot](./docs/login.png)

## Installation

```shell
$ docker-compose -f docker-compose.yml up
$ docker-compose run freshlytics npm run migrate
$ docker-compose run freshlytics npm run seed
```

## Development

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
