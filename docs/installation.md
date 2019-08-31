# Installation

## Instructions

- Install `docker` and `docker-compose`
- Create the `docker-compose.yml` as shown below
- Run the following commands

```shell
$ docker-compose -f docker-compose.yml up
$ docker-compose run freshlytics npm run migrate
$ docker-compose run freshlytics npm run seed
```

## Images

The docker image is hosted at https://hub.docker.com/r/freshlytics/freshlytics

This service depends on PipelineDB for data storage: https://hub.docker.com/r/pipelinedb/pipelinedb/

## Example compose file

Here's an example docker compose file to run this application:

```yaml
version: "3"

services:
  freshlytics:
    image: freshlytics/freshlytics
    ports:
      - "80:3001"
    environment:
      - DATABASE_URL=postgres://postgres:hunter2@db:5432/freshlytics
      - NODE_ENV=production
    command: npm start
    depends_on:
      - db

  db:
    image: pipelinedb/pipelinedb-postgresql-11
    environment:
      - POSTGRES_PASSWORD=hunter2
      - POSTGRES_DB=freshlytics
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
```
