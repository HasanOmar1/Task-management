import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);

export default router;
