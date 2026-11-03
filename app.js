import express from "express";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

export default app;
  