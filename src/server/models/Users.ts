import Postgres from "../libs/Postgres";
import { User } from "../types/User.type";

async function add(name: string, password: string) {
  const statement = "INSERT INTO users (name, password) VALUES ($1, $2)";
  await Postgres.query(statement, [name, password]);
}

async function updatePassword(id: string, password: string) {
  const statement = "UPDATE users SET password = $2 WHERE id = $1";
  await Postgres.query(statement, [id, password]);
}

async function getById(id: string): Promise<User> {
  const statement = `
    SELECT
      id, name, password
    FROM
      users
    WHERE
      id = $1
  `;

  const result = await Postgres.query(statement, [id]);
  return result.rows[0];
}

async function getByName(name: string): Promise<User> {
  const statement = `
    SELECT
      id, name, password
    FROM
      users
    WHERE
      name = $1
  `;

  const result = await Postgres.query(statement, [name]);
  return result.rows[0];
}

export default {
  add,
  updatePassword,
  getById,
  getByName
};
