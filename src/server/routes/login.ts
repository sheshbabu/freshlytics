import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Users from "../database/Users";

export default async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Users.getByName(req.body.username);

    if (user === undefined) {
      throw new Error("Invalid user");
    }

    const isPasswordMatching = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatching) {
      throw new Error("Invalid password");
    }

    if (req.session && req.session.user === undefined) {
      req.session.user = user;
    }

    let shouldForcePasswordChange = false;

    if (req.body.password === "hunter2") {
      shouldForcePasswordChange = true;
    }

    res.status(200).send({ shouldForcePasswordChange });
  } catch (e) {
    next(e);
  }
}
