-- up migration

CREATE FOREIGN TABLE PageViewStream (
  projectId text,
  date date,
  path text,
  referrer text,
  browserName text,
  browserNameVersion text
) SERVER pipelinedb;


CREATE VIEW DailyPageViewTotals WITH (action=materialize) AS
SELECT projectId, date, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date;