import Database from ".";
import { PageViewEvent } from "../types/PageViewEvent";

function insert(event: PageViewEvent) {
  const { projectId, date, path, referrer, browserName, browserNameVersion } = event;

  return Database.query(
    "INSERT INTO PageViewStream (projectId, date, path, referrer, browserName, browserNameVersion) VALUES($1, $2, $3, $4, $5, $6)",
    [projectId, date, path, referrer, browserName, browserNameVersion]
  );
}

export default { insert };
