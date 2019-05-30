import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function query(statement: string, values: Array<string | number>) {
  const client = await pool.connect();
  const result = await client.query(statement, values);
  client.release();
  return result;
}

export default {
  query,
  close: pool.end
};
