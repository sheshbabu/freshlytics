-- up migration

CREATE TABLE Users (
  id SERIAL,
  name text,
  password text
);

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

