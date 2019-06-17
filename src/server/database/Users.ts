import Database from ".";

type Row = {
  id: string;
  name: string;
  password: string;
};

async function getById(id: string): Promise<Row> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE id = $1
  `;

  const result = await Database.query(statement, [id]);
  return result.rows[0];
}

async function getByName(name: string): Promise<Row> {
  const statement = `
    SELECT id, name, password
    FROM Users
    WHERE name = $1
  `;

  const result = await Database.query(statement, [name]);
  return result.rows[0];
}

export default { getById, getByName };
