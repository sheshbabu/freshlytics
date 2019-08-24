import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import config from "../config";
import { User } from "../types/User.type";

async function add(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body.user;
  const password = await bcrypt.hash(config.defaultPassword, 10);

  try {
    if (user.name === "") {
      throw new Error("Name cannot be empty");
    }

    await Users.add(user.name, password, user.is_admin);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req.params;
  const user: User = req.body.user;

  try {
    if (user.name === "") {
      throw new Error("Name cannot be empty");
    }

    await Users.update(user_id, user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUserId = req.session && req.session.user.id;
    const { user_id } = req.params;

    if (String(currentUserId) === user_id) {
      throw new Error("You cannot delete yourself");
    }

    await Users.remove(user_id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await Users.getAll();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
}

async function getFromSession(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.session && req.session.user.id;
    const user = await Users.getById(userId);
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req.params;
  try {
    const user = await Users.getById(user_id);
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
}

export default {
  add,
  update,
  remove,
  getAll,
  getFromSession,
  getById
};
