import { Router } from "express";
import uploadOption from "../../Utils/uploadOption.js";
import {
  multiRemove,
  multiUpload,
  singleRemove,
  singleUpload,
} from "./uploadCn.js";

const uploadRouter = Router();
uploadRouter
  .route("/")
  .post(uploadOption.single("file"), singleUpload)
  .delete(singleRemove);
uploadRouter
  .route("/multi")
  .post(uploadOption.single("file", 10), multiUpload)
  .delete(multiRemove);
  export default uploadRouter;
