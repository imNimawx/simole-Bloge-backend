import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { catchError } from "vanta-api";
import exportValidation from "./Middlewares/exportValidation.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use(exportValidation)


app.use(catchError)
export default app;
