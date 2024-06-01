import { Router } from "express";
import {
  createTask,
  createTasksTable,
  getAllTasks,
  getTaskDetailsById,
} from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskDetailsById);
router.post("/create-table", createTasksTable);
router.post("/create", protect, createTask);

export default router;
