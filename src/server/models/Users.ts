import Postgres from "../libs/Postgres";
import { User } from "../types/User.type";

async function add(name: string, password: string, isAdmin: boolean) {
  const statement = "INSERT INTO users (name, password, is_admin) VALUES ($1, $2, $3)";
  await Postgres.query(statement, [name, password, String(isAdmin)]);
}

async function update(id: string, user: User) {
  const statement = `
    UPDATE
      users 
    SET
      name = $2,
      is_admin = $3,
      updated_at = NOW()
    WHERE
      id = $1
  `;

  await Postgres.query(statement, [id, user.name, String(user.is_admin)]);
}

async function updatePassword(id: string, password: string) {
  const statement = `
    UPDATE
      users 
    SET
      password = $2,
      updated_at = NOW()
    WHERE
      id = $1
  `;

  await Postgres.query(statement, [id, password]);
}

async function remove(id: number) {
  await Postgres.query("DELETE FROM users WHERE id = $1", [id]);
}

async function getAll(): Promise<User[]> {
  const statement = "SELECT id, name, is_admin FROM users";

  const result = await Postgres.query(statement, []);
  return result.rows;
}

async function getById(id: string): Promise<User> {
  const statement = "SELECT id, name, is_admin FROM users WHERE id = $1";
  const result = await Postgres.query(statement, [id]);
  return result.rows[0];
}

async function getByName(name: string): Promise<User> {
  const statement = "SELECT id, name, is_admin FROM users WHERE name = $1";
  const result = await Postgres.query(statement, [name]);
  return result.rows[0];
}

async function getPasswordByName(name: string): Promise<string | null> {
  const statement = "SELECT password FROM users WHERE name = $1";
  const result = await Postgres.query(statement, [name]);
  const password = result.rows[0] ? result.rows[0].password : null;
  return password;
}

export default {
  add,
  update,
  updatePassword,
  remove,
  getAll,
  getById,
  getByName,
  getPasswordByName
};
