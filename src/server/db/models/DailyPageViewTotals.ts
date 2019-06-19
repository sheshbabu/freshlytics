import PgClient from "../PgClient";

type PageViewCount = {
  date: string;
  total: string;
};

async function getCount(projectId: string, startDate = "", endDate = ""): Promise<PageViewCount[]> {
  let dateClause = "";
  let values = [projectId];

  if (startDate && endDate) {
    dateClause = "AND date BETWEEN $2 AND $3";
    values = values.concat([startDate, endDate]);
  }

  const statement = `
    SELECT date, total
    FROM DailyPageViewTotals
    WHERE projectId = $1 ${dateClause}
    ORDER BY date ASC
  `;

  const result = await PgClient.query(statement, values);
  return result.rows;
}

export default { getCount };
