import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  testFun,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/test", protect, testFun);
router.post("/login", login);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);

export default router;
