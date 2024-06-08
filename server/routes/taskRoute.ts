import { Router } from "express";
import {
  createTask,
  createTasksTable,
  deleteTask,
  getAllTasks,
  getAllTasksDetails,
  getTaskDetailsById,
  getTasksByStatus,
  updateTask,
} from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/detailed", getAllTasksDetails);
router.get("/detailed/:status", getTasksByStatus);
router.get("/:id", getTaskDetailsById);
router.post("/create-table", createTasksTable);
router.put("/update/:id", updateTask);
// protected
router.use(protect);
router.post("/create", createTask);
router.delete("/delete/:id", deleteTask);

export default router;
