import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getBrowserNameTotals(): Promise<Row[]> {
  const statement = `
    SELECT browserName as name, SUM(total) as total
    FROM DailyBrowserNamePageViewTotals
    GROUP BY browserName
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getBrowserNameTotals };
