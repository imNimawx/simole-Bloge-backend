import { Router } from "express";
import isAdmin from "../../Middlewares/isAdmin.js";
import { create, getAll, getOne, remove, update } from "./categoryCn.js";

const categoryRoute=Router()
categoryRoute.route("/").get(isAdmin,getAll).post(isAdmin,create)
categoryRoute.route("/:id").get(getOne).patch(isAdmin,update).delete(isAdmin,remove)
export default categoryRoute