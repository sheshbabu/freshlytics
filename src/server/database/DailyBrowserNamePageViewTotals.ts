import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getBrowserNameTotals(projectId: string, startDate = "", endDate = ""): Promise<Row[]> {
  let dateClause = "";
  let values = [projectId];

  if (startDate && endDate) {
    dateClause = "AND date BETWEEN $2 AND $3";
    values = values.concat([startDate, endDate]);
  }

  const statement = `
    SELECT browserName as name, SUM(total) as total
    FROM DailyBrowserNamePageViewTotals
    WHERE projectId = $1 ${dateClause}
    GROUP BY browserName
    LIMIT 5
  `;
  const result = await Database.query(statement, values);
  return result.rows;
}

export default { getBrowserNameTotals };
