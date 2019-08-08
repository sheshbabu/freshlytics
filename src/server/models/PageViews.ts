import Postgres from "../libs/Postgres";
import { PageViewEvent } from "../types/PageViewEvent.type";

async function add(event: PageViewEvent) {
  const { project_id, date, path, referrer, browser_name, browser_name_version } = event;
  const statement = `
    INSERT INTO pageview_stream (
      project_id, 
      date, 
      path, 
      referrer, 
      browser_name, 
      browser_name_version
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;
  return Postgres.query(statement, [project_id, date, path, referrer, browser_name, browser_name_version]);
}

async function getByDate(projectId: string, startDate: string, endDate: string) {
  const statement = `
    SELECT
      date,
      total
    FROM
      pageviews_by_date
    WHERE
      project_id = $1 AND
      date BETWEEN $2 AND $3
    ORDER BY
      date ASC
  `;
  const result = await Postgres.query(statement, [projectId, startDate, endDate]);
  return result.rows;
}

async function getByPath(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT
      path AS name,
      SUM(total) AS total,
      COUNT(*) OVER() AS total_rows
    FROM
      pageviews_by_path
    WHERE
      project_id = $1 AND
      date BETWEEN $2 AND $3
    GROUP BY
      path
    ORDER BY
      total DESC
    LIMIT
      10
    OFFSET
      $4 * 10
  `;
  const result = await Postgres.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByReferrer(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT
      referrer AS name,
      SUM(total) AS total,
      COUNT(*) OVER() AS total_rows
    FROM
      pageviews_by_referrer
    WHERE
      project_id = $1 AND
      date BETWEEN $2 AND $3
    GROUP BY
      referrer
    ORDER BY
      total DESC
    LIMIT
      10
    OFFSET
      $4 * 10
  `;
  const result = await Postgres.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByBrowserName(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT
      browser_name AS name,
      SUM(total) AS total,
      COUNT(*) OVER() AS total_rows
    FROM
      pageviews_by_browsername
    WHERE
      project_id = $1 AND
      date BETWEEN $2 AND $3
    GROUP BY
      browser_name
    ORDER BY
      total DESC
    LIMIT
      10
    OFFSET
      $4 * 10
  `;
  const result = await Postgres.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByBrowserNameVersion(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT
      browser_name_version AS name,
      SUM(total) AS total,
      COUNT(*) OVER() AS total_rows
    FROM
      pageviews_by_browsernameversion
    WHERE
      project_id = $1 AND
      date BETWEEN $2 AND $3
    GROUP BY
      browser_name_version
    ORDER BY
      total DESC
    LIMIT
      10
    OFFSET
      $4 * 10
  `;
  const result = await Postgres.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

export default {
  add,
  getByDate,
  getByPath,
  getByReferrer,
  getByBrowserName,
  getByBrowserNameVersion
};
