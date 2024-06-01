import { Router } from "express";
import { createTasksTable } from "../controllers/taskController.js";

const router = Router();

router.post("/create-table", createTasksTable);

export default router;
