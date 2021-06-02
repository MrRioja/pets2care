import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";
import AppError from "./errors/AppError";

import "./database/connection";
import errorHandler from "./errors/handler";

import routes from "./routes";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  });
});

app.listen(process.env.PORT || 3333);
