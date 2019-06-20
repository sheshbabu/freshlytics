import PgClient from "../PgClient";
import { PageViewEvent } from "../../types/PageViewEvent";

async function add(event: PageViewEvent) {
  const { projectId, date, path, referrer, browserName, browserNameVersion } = event;
  const statement = `
    INSERT INTO PageViewStream (
      projectId, 
      date, 
      path, 
      referrer, 
      browserName, 
      browserNameVersion
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;
  return PgClient.query(statement, [projectId, date, path, referrer, browserName, browserNameVersion]);
}

// "1900-01-01""3000-01-01"
async function getByDate(projectId: string, startDate: string, endDate: string) {
  const statement = `
    SELECT date, total
    FROM PageViewsByDate
    WHERE projectId = $1 AND date BETWEEN $2 AND $3
    ORDER BY date ASC
  `;
  const result = await PgClient.query(statement, [projectId, startDate, endDate]);
  return result.rows;
}

async function getByPath(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT path as name, SUM(total) as total, count(*) OVER() AS totalRows
    FROM PageViewsByPath
    WHERE projectId = $1 AND date BETWEEN $2 AND $3
    GROUP BY path
    ORDER BY total DESC
    LIMIT 10
    OFFSET $4 * 10
  `;
  const result = await PgClient.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByReferrer(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT referrer as name, SUM(total) as total, count(*) OVER() AS totalRows
    FROM PageViewsByReferrer
    WHERE projectId = $1 AND date BETWEEN $2 AND $3
    GROUP BY referrer
    ORDER BY total DESC
    LIMIT 10
    OFFSET $4 * 10
  `;
  const result = await PgClient.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByBrowserName(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT browserName as name, SUM(total) as total, count(*) OVER() AS totalRows
    FROM PageViewsByBrowserName
    WHERE projectId = $1 AND date BETWEEN $2 AND $3
    GROUP BY browserName
    ORDER BY total DESC
    LIMIT 10
    OFFSET $4 * 10
  `;
  const result = await PgClient.query(statement, [projectId, startDate, endDate, page]);
  return result.rows;
}

async function getByBrowserNameVersion(projectId: string, startDate: string, endDate: string, page: number) {
  const statement = `
    SELECT browserNameVersion as name, SUM(total) as total, count(*) OVER() AS totalRows
    FROM PageViewsByBrowserNameVersion
    WHERE projectId = $1 AND date BETWEEN $2 AND $3
    GROUP BY browserNameVersion
    ORDER BY total DESC
    LIMIT 10
    OFFSET $4 * 10
  `;
  const result = await PgClient.query(statement, [projectId, startDate, endDate, page]);
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
