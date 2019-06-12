import Database from ".";

type PathPageViewTotals = {
  path: string;
  total: string;
};

async function getPathTotals(): Promise<PathPageViewTotals[]> {
  const statement = `
    SELECT path, SUM(total) as total
    FROM DailyPathPageViewTotals
    GROUP BY path
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getPathTotals };
