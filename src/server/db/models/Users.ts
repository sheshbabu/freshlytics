import PgClient from "../PgClient";

type Row = {
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

async function getById(id: string): Promise<Row> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE id = $1
  `;

  const result = await PgClient.query(statement, [id]);
  return result.rows[0];
}

async function getByName(name: string): Promise<Row> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE name = $1
  `;

  const result = await PgClient.query(statement, [name]);
  return result.rows[0];
}

export default { add, getById, getByName };
