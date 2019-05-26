import path from "path";
import express, { Request, Response, NextFunction as Next } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import Database from "./database";
import router from "./router";

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "./client")));
app.use("/api", router);
app.use(handleError);

const server = app.listen(3001);

process.on("uncaughtException", gracefullyExitProcess);
process.on("unhandledRejection", gracefullyExitProcess);
process.on("SIGINT", gracefullyExitProcess);

function handleError(err: Error, _req: Request, res: Response, _next: Next) {
  const message = err.message || "Something went wrong!";
  res.status(500).send({ message });
}

async function gracefullyExitProcess() {
  await Database.close();
  server.close(() => process.exit());
}
