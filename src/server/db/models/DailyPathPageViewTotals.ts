import PgClient from "../PgClient";

type Row = {
  name: string;
  total: string;
};

async function getPathTotals(projectId: string, startDate = "", endDate = ""): Promise<Row[]> {
  let dateClause = "";
  let values = [projectId];

  if (startDate && endDate) {
    dateClause = "AND date BETWEEN $2 AND $3";
    values = values.concat([startDate, endDate]);
  }

  const statement = `
    SELECT path as name, SUM(total) as total
    FROM DailyPathPageViewTotals
    WHERE projectId = $1 ${dateClause}
    GROUP BY path
    LIMIT 20
  `;
  const result = await PgClient.query(statement, values);
  return result.rows;
}

export default { getPathTotals };
