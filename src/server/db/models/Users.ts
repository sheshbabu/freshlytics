import PgClient from "../PgClient";

export type User = {
  id: string;
  name: string;
  password: string;
};

async function add(name: string, password: string) {
  const statement = `
    INSERT INTO Users (
      name, password
    ) VALUES ($1, $2);
  `;

  await PgClient.query(statement, [name, password]);
}

async function updatePassword(id: string, password: string) {
  const statement = `
    UPDATE Users
    SET password = $2
    WHERE id = $1
  `;

  await PgClient.query(statement, [id, password]);
}

async function getById(id: string): Promise<User> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE id = $1
  `;

  const result = await PgClient.query(statement, [id]);
  return result.rows[0];
}

async function getByName(name: string): Promise<User> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE name = $1
  `;

  const result = await PgClient.query(statement, [name]);
  return result.rows[0];
}

export default { add, updatePassword, getById, getByName };
