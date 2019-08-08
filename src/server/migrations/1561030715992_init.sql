-- up migration

CREATE TABLE "users" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text,
  "password" text
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

CREATE FOREIGN TABLE "pageview_stream" (
  "project_id" text,
  "date" date,
  "path" text,
  "referrer" text,
  "browser_name" text,
  "browser_name_version" text
) SERVER pipelinedb;

CREATE VIEW "pageviews_by_date"
  WITH (action=materialize) AS
  SELECT
    "project_id",
    "date",
    COUNT(*) AS "total"
  FROM
    "pageview_stream"
  GROUP BY
    "project_id",
    "date";

CREATE VIEW "pageviews_by_path"
  WITH (action=materialize) AS
  SELECT
    "project_id",
    "date",
    "path",
    COUNT(*) AS "total"
  FROM
    "pageview_stream"
  GROUP BY
    "project_id",
    "date",
    "path";

CREATE VIEW "pageviews_by_referrer"
  WITH (action=materialize) AS
  SELECT
    "project_id",
    "date",
    "referrer",
    COUNT(*) AS "total"
  FROM
    "pageview_stream"
  GROUP BY
    "project_id",
    "date",
    "referrer";

CREATE VIEW "pageviews_by_browsername"
  WITH (action=materialize) AS
  SELECT
    "project_id",
    "date",
    "browser_name",
    COUNT(*) AS "total"
  FROM
    "pageview_stream"
  GROUP BY
    "project_id",
    "date",
    "browser_name";

CREATE VIEW "pageviews_by_browsernameversion"
  WITH (action=materialize) AS
  SELECT
    "project_id",
    "date",
    "browser_name_version",
    COUNT(*) AS "total"
  FROM
    "pageview_stream"
  GROUP BY
    "project_id",
    "date",
    "browser_name_version";

