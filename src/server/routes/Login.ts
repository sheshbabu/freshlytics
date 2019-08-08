import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import config from "../config";
import Users from "../models/Users";
import { User } from "../types/User.type";

async function login(req: Request, res: Response, next: NextFunction) {
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
      req.session.user.isAuthenticated = true;
    }

    let shouldForcePasswordChange = false;

    if (req.body.password === config.defaultPassword) {
      shouldForcePasswordChange = true;
    }

    res.status(200).send({ shouldForcePasswordChange });
  } catch (e) {
    next(e);
  }
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const user: User = req.session && req.session.user;
    const { oldPassword, newPassword } = req.body;

    if (user === undefined) {
      throw new Error("Invalid user");
    }

    if (oldPassword === newPassword) {
      throw new Error("New password same as old");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.updatePassword(user.id, hashedPassword);

    res.status(200).send({});
  } catch (e) {
    next(e);
  }
}

export default {
  login,
  changePassword
};
