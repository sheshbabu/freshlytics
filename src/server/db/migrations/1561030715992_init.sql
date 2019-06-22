-- up migration

CREATE TABLE Users (
  id SERIAL,
  name text,
  password text
);

-- for session persistance using connect-pg-simple

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- for events

CREATE FOREIGN TABLE PageViewStream (
  projectId text,
  date date,
  path text,
  referrer text,
  browserName text,
  browserNameVersion text
) SERVER pipelinedb;

CREATE VIEW PageViewsByDate WITH (action=materialize) AS
SELECT projectId, date, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date;

CREATE VIEW PageViewsByPath WITH (action=materialize) AS
SELECT projectId, date, path, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, path;

CREATE VIEW PageViewsByReferrer WITH (action=materialize) AS
SELECT projectId, date, referrer, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, referrer;

CREATE VIEW PageViewsByBrowserName WITH (action=materialize) AS
SELECT projectId, date, browserName, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, browserName;

CREATE VIEW PageViewsByBrowserNameVersion WITH (action=materialize) AS
SELECT projectId, date, browserNameVersion, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, browserNameVersion;

