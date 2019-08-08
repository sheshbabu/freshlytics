import express, { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/UnauthenticatedError";
import Collect from "./Collect";
import Login from "./Login";
import PageViews from "./PageViews";

const router = express.Router();

// public
router.use("/collect", Collect.collect);
router.use("/login", Login.login);

// logged in
router.use(ensureLoggedIn);
router.use("/change_password", Login.changePassword);
router.use("/events/pageviews", PageViews.get);

function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    throw new UnauthenticatedError();
  }

  next();
}

export default router;
