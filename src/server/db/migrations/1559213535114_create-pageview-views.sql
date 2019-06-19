-- up migration

CREATE VIEW DailyPathPageViewTotals WITH (action=materialize) AS
SELECT projectId, date, path, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, path;

CREATE VIEW DailyReferrerPageViewTotals WITH (action=materialize) AS
SELECT projectId, date, referrer, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, referrer;

CREATE VIEW DailyPathReferrerPageViewTotals WITH (action=materialize) AS
SELECT projectId, date, path, referrer, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, path, referrer;

CREATE VIEW DailyBrowserNamePageViewTotals WITH (action=materialize) AS
SELECT projectId, date, browserName, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, browserName;

CREATE VIEW DailyBrowserNameVersionPageViewTotals WITH (action=materialize) AS
SELECT projectId, date, browserNameVersion, COUNT(*) AS total
FROM PageViewStream
GROUP BY projectId, date, browserNameVersion;