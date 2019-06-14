import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getReferrerTotals(projectId: string, startDate = "", endDate = ""): Promise<Row[]> {
  let dateClause = "";
  let values = [projectId];

  if (startDate && endDate) {
    dateClause = "AND date BETWEEN $2 AND $3";
    values = values.concat([startDate, endDate]);
  }

  const statement = `
    SELECT referrer as name, SUM(total) as total
    FROM DailyReferrerPageViewTotals
    WHERE projectId = $1 ${dateClause}
    GROUP BY referrer
    LIMIT 10
  `;
  const result = await Database.query(statement, values);
  return result.rows;
}

export default { getReferrerTotals };
