import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getPathTotals(): Promise<Row[]> {
  const statement = `
    SELECT path as name, SUM(total) as total
    FROM DailyPathPageViewTotals
    GROUP BY path
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getPathTotals };
