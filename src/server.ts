import express from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";

import "./database/connection";
import errorHandler from "./errors/handler";

import routes from "./routes";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
