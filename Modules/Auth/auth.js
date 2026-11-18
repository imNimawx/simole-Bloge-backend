import { Router } from "express";
import { login, register } from "./authCn.js";

const authRouter=Router();
authRouter.route("/").post(login)
authRouter.route("/register").post(register)
export default authRouter