import Database from ".";

type Row = {
  name: string;
  total: string;
};

async function getReferrerTotals(): Promise<Row[]> {
  const statement = `
    SELECT referrer as name, SUM(total) as total
    FROM DailyReferrerPageViewTotals
    GROUP BY referrer
  `;
  const result = await Database.query(statement, []);
  return result.rows;
}

export default { getReferrerTotals };
