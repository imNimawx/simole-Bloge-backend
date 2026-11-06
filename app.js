import express from "express";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import { catchError } from "vanta-api";
import authRouter from "./Modules/Auth/authCn.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth",authRouter)


app.use(catchError);
export default app;
