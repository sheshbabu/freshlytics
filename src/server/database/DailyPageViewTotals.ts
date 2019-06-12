import Database from ".";

type PageViewCount = {
  date: string;
  total: string;
};

async function getCount(projectId = 1000): Promise<PageViewCount[]> {
  const statement = `
    SELECT date, total
    FROM DailyPageViewTotals
    ORDER BY date ASC
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getCount };
