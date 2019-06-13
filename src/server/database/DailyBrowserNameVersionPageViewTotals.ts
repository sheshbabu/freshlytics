import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getBrowserNameVersionTotals(): Promise<Row[]> {
  const statement = `
    SELECT browserNameVersion as name, SUM(total) as total
    FROM DailyBrowserNameVersionPageViewTotals
    GROUP BY browserNameVersion
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getBrowserNameVersionTotals };
