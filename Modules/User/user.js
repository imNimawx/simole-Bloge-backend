import { Router } from "express";
import isAdmin from "../../Middlewares/isAdmin";
import { changePassword, getAll, getOne, update } from "./userCn.js";
const userRouter = Router();
userRouter.route("/").get(isAdmin, getAll);
userRouter.route("/:id").get(getOne).patch(update);
userRouter.route("/change-password/:id").patch(changePassword)

export default userRouter