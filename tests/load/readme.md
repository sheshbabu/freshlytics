# Load testing

Start the container and migrate db

```shell
$ docker-compose -f docker-compose.yml up
$ docker-compose run raylight npm run migrate
```

Start load test

```shell
$ npm run test:load
```

Monitor CPU and memory

```shell
$ docker stats
```
