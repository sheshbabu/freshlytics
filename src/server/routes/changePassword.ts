import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Users, { User } from "../db/models/Users";

export default async function changePassword(req: Request, res: Response, next: NextFunction) {
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
