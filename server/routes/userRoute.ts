import { Router } from "express";
import {
  createUser,
  createUsersTable,
  deleteUser,
  getUsers,
  login,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/create-table", createUsersTable);
router.post("/login", login);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);

export default router;
