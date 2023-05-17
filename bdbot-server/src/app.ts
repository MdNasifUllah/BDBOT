import express, { Request, Response } from "express";
import cors from "cors";
import morganBody from "morgan-body";

import { handleClientError } from "./utils/error/error.util";

import { env } from "./config";

import { httpLogger } from "./utils/log/http-logger.util";
import { scanRecordRouter } from "modules/scan-record/scan-record.route";

// Initialization
const app = express();

// Configuration
app.set("port", env.port);

// Middlewares
app.use(
  cors({
    origin: [env.webClientUrl],
    credentials: true
  })
);

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: false }));

// HTTP loggers
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false,
  logIP: false,
  maxBodyLength: 1024
});
app.use(httpLogger);

app.use(scanRecordRouter);

app.get("/are-you-ok", (req: Request, res: Response) => {
  return res.status(200).send("Yeah, I am OK.");
});

app.use("*", (req: Request, res: Response) => {
  return handleClientError(404, "Unknown request path", res);
});

export default app;
