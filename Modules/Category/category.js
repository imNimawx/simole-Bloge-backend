import { Router } from "express";
import isAdmin from "../../Middlewares/isAdmin";
import { create, getAll, getOne, update } from "./categoryCn.js";

const categoryRoute=Router()
categoryRoute.route("/").get(isAdmin,getAll).post(isAdmin,create)
categoryRoute.route("/:id").get(getOne).patch(isAdmin,update).delete(isAdmin, remove)
export default categoryRoute