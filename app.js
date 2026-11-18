import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { catchError } from "vanta-api";
import exportValidation from "./Middlewares/exportValidation.js";
import isLogin from "./Middlewares/isLogin.js";
import userRouter from "./Modules/User/user.js";
import authRouter from "./Modules/Auth/auth.js";
import categoryRoute from "./Modules/Category/category.js";
import postRouter from "./Modules/Post/post.js";
import cmRouter from "./Modules/Comment/comment.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(exportValidation);


app.use('/api/auth',authRouter)
app.use('/api/user',isLogin,userRouter)
app.use('/api/category',categoryRoute)
app.use("/api/post",postRouter)
app.use("/api/comments",cmRouter)


app.use(catchError);
export default app;
