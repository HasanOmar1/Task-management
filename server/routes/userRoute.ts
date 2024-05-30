import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";

const route = express.Router();

route.get("/", getUsers);
route.post("/create", createUser);
route.delete("/delete/:id", deleteUser);

export default route;
