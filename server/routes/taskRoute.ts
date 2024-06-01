import { Router } from "express";
import {
  createTask,
  createTasksTable,
  deleteTask,
  getAllTasks,
  getAllTasksDetails,
  getTaskDetailsById,
} from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/detailed", getAllTasksDetails);
router.get("/:id", getTaskDetailsById);
router.post("/create-table", createTasksTable);
router.post("/create", protect, createTask);
router.delete("/delete/:id", protect, deleteTask);

export default router;
