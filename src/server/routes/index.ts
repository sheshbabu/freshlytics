import express, { Request, Response, NextFunction } from "express";
import collect from "./collect";
import login from "./login";
import changePassword from "./changePassword";
import getPageViews from "./getPageViews";
import UnauthenticatedError from "../errors/UnauthenticatedError";

const router = express.Router();

// public
router.use("/collect", collect);
router.use("/login", login);

// logged in
router.use(ensureLoggedIn);
router.use("/changePassword", changePassword);
router.use("/events/pageviews", getPageViews);

function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    throw new UnauthenticatedError();
  }

  next();
}

export default router;
