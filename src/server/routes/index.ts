import express, { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/UnauthenticatedError";
import UnauthorizedError from "../errors/UnauthorizedError";
import Collect from "./Collect";
import Auth from "./Auth";
import PageViews from "./PageViews";
import Users from "./Users";
import Projects from "./Projects";

const router = express.Router();

// public
router.use("/collect", Collect.collect);
router.use("/login", Auth.login);

// logged in
router.use(ensureLoggedIn);
router.use("/change_password", Auth.changePassword);
router.use("/logout", Auth.logout);
router.get("/user", Users.getFromSession);
router.get("/users/:user_id", Users.getById);
router.get("/projects", Users.getAll);
router.get("/projects/:project_id", Projects.getById);
router.post("/projects", Projects.add);
router.put("/projects/:project_id", Projects.update);
router.delete("/projects/:project_id", Projects.remove);

router.use("/events/pageviews", PageViews.get);

// admin
router.use(ensureAdmin);
router.get("/users", Users.getAll);
router.post("/users", Users.add);
router.put("/users/:user_id", Users.update);
router.delete("/users/:user_id", Users.remove);

function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    throw new UnauthenticatedError();
  }

  next();
}

function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && !req.session.user.is_admin) {
    throw new UnauthorizedError();
  }

  next();
}

export default router;
