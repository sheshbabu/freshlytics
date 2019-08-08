import bcrypt from "bcrypt";
import Users from "../models/Users";
import config from "../config";

async function addAdmin() {
  const password = await bcrypt.hash(config.defaultPassword, 10);
  Users.add("admin", password);
}

addAdmin();
