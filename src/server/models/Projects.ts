import Postgres from "../libs/Postgres";
import { Project } from "../types/Project.type";

async function add(id: string, name: string, timezone: string) {
  const statement = "INSERT INTO projects (id, name, timezone) VALUES ($1, $2, $3)";
  await Postgres.query(statement, [id, name, timezone]);
}

async function update(id: string, project: Project) {
  const statement = `
    UPDATE
      projects 
    SET
      name = $2,
      timezone = $3,
      updated_at = NOW()
    WHERE
      id = $1
  `;

  await Postgres.query(statement, [id, project.name, project.timezone]);
}

async function remove(id: string) {
  await Postgres.query("DELETE FROM projects WHERE id = $1", [id]);
}

async function getAll(): Promise<Project[]> {
  const statement = "SELECT id, name, timezone FROM projects";
  const result = await Postgres.query(statement, []);
  return result.rows;
}

async function getById(id: string): Promise<Project> {
  const statement = "SELECT id, name, timezone FROM projects WHERE id = $1";
  const result = await Postgres.query(statement, [id]);
  return result.rows[0];
}

export default {
  add,
  update,
  remove,
  getAll,
  getById
};
