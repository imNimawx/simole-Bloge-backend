import { Router } from "express";
import {
  changePublished,
  create,
  getAll,
  getAllCommentsOfPost,
  remove,
} from "./commentCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
import isLogin from "../../Middlewares/isLogin.js";

const cmRouter = Router();
cmRouter.route("/").get(isAdmin, getAll).post(isLogin, create);
cmRouter
  .route("/:id")
  .get(getAllCommentsOfPost)
  .patch(isAdmin, changePublished)
  .delete(isLogin, remove);
export default cmRouter;
