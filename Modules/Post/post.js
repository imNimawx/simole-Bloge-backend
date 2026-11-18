import { Router } from "express";
import {
  createPost,
  getAll,
  getOne,
  removePost,
  updatePost,
} from "./postCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";

const postRouter = Router();
postRouter.route("/").get(getAll).post(isAdmin, createPost);
postRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, updatePost)
  .delete(isAdmin, removePost);

  export default postRouter