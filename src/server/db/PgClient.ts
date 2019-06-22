import { Pool } from "pg";
import connectPgSimple from "connect-pg-simple";
import { RequestHandler } from "express";
import { SessionOptions } from "express-session";

type Session = (options?: SessionOptions) => RequestHandler;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function query(statement: string, values: Array<string | number>) {
  const client = await pool.connect();
  const result = await client.query(statement, values);
  client.release();
  return result;
}

function getSessionStore(session: Session) {
  const pgSession = connectPgSimple(session);

  return new pgSession({ pool });
}

export default {
  query,
  getSessionStore,
  close: pool.end
};
