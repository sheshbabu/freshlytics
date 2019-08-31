# Development

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
