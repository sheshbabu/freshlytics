import path from "path";
import express, { Request, Response, NextFunction as Next } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import PgClient from "./db/PgClient";
import router from "./router";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

app.use(compression());
app.use(bodyParser.json());
app.use(
  session({
    store: PgClient.getSessionStore(session),
    secret: "raylight",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static(path.resolve(__dirname, "./client")));
app.use("/api", ensureAuthenticated, router);
app.use(handleError);

const server = app.listen(3001);

process.on("uncaughtException", gracefullyExitProcess);
process.on("unhandledRejection", gracefullyExitProcess);
process.on("SIGINT", gracefullyExitProcess);

function ensureAuthenticated(req: Request, res: Response, next: Next) {
  if (req.path === "/login" || req.path === "/collect") {
    return next();
  }

  if (req.session && req.session.user && req.session.user.isAuthenticated) {
    return next();
  }

  next(new Error("Unauthorized"));
}

function handleError(err: Error, _req: Request, res: Response, _next: Next) {
  const message = err.message || "Something went wrong!";
  res.status(500).send({ message });
}

async function gracefullyExitProcess() {
  await PgClient.close();
  server.close(() => process.exit());
}
