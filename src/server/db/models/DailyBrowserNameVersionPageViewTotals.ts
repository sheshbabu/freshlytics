import PgClient from "../PgClient";

type Row = {
  name: string;
  total: string;
};

async function getBrowserNameVersionTotals(projectId: string, startDate = "", endDate = ""): Promise<Row[]> {
  let dateClause = "";
  let values = [projectId];

  if (startDate && endDate) {
    dateClause = "AND date BETWEEN $2 AND $3";
    values = values.concat([startDate, endDate]);
  }

  const statement = `
    SELECT browserNameVersion as name, SUM(total) as total
    FROM DailyBrowserNameVersionPageViewTotals
    WHERE projectId = $1 ${dateClause}
    GROUP BY browserNameVersion
    LIMIT 5
  `;
  const result = await PgClient.query(statement, values);
  return result.rows;
}

export default { getBrowserNameVersionTotals };
