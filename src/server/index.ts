import path from "path";
import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import Postgres from "./libs/Postgres";
import router from "./routes";

const ASSET_PATH = process.env.NODE_ENV === "development" ? "../../dist/client" : "./client";

const app = express();

app.locals.projects = [];

app.use(compression());
app.use(bodyParser.json());
app.use(
  session({
    store: Postgres.getSessionStore(session),
    secret: "freshlytics",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10 // 10 Years
    }
  })
);
app.use("/api", router);
app.use(express.static(path.resolve(__dirname, ASSET_PATH)));
app.use("*", express.static(path.resolve(__dirname, ASSET_PATH)));
app.use(handleError);

const server = app.listen(3001);

process.on("uncaughtException", gracefullyExitProcess);
process.on("unhandledRejection", gracefullyExitProcess);
process.on("SIGINT", gracefullyExitProcess);

function handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const message = err.message || "Something went wrong!";
  let code = 500;

  if (err.name === "UnauthorizedError") {
    code = 403;
  } else if (err.name === "UnauthenticatedError") {
    code = 401;
  }

  res.status(code).send({ message });
}

async function gracefullyExitProcess() {
  await Postgres.close();
  server.close(() => process.exit());
}
