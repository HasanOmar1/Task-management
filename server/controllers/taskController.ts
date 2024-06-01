import db from "../database.js";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest.js";
import STATUS_CODE from "../constants/statusCodes.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const createTasksTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tableQuery = `CREATE TABLE
    tasks
   (
   taskId INT AUTO_INCREMENT,
   assignor INT NOT NULL,
    task VARCHAR(255) NOT NULL,
    assignTo INT NOT NULL,
    status ENUM('Pending','In Progress' , 'Completed') NOT NULL,
    priority ENUM('Low','Medium' , 'High' , 'Very High') NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(taskId),
    FOREIGN KEY (assignor) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (assignTo) REFERENCES users(userId) ON DELETE CASCADE
   )`;

    const [result] = await db.promise().query<ResultSetHeader>(tableQuery);
    console.log(result);

    res.send(`Table has been created`);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getTasksQuery = "SELECT * FROM tasks";
    const [tasks] = await db.promise().query<RowDataPacket[]>(getTasksQuery);

    res.send(tasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllTasksDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskDetailsQuery = `
    SELECT
    tasks.taskId,
    assignor.name AS assignor  ,
    tasks.task ,
    assignTo.name AS assignTo,
    tasks.status ,
    tasks.priority ,
    tasks.creationDate
    FROM 
    tasks
    JOIN
    users AS assignor ON assignor.userId = tasks.assignor
    JOIN
    users AS assignTo  ON assignTo.userId = tasks.assignTo`;

    const [result] = await db
      .promise()
      .query<RowDataPacket[]>(taskDetailsQuery);

    if (result.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Task not found");
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

//helper function

const getTaskById = async (id: number | string) => {
  try {
    const taskQuery = "SELECT * FROM tasks WHERE taskId = ?";
    const [result] = await db.promise().query<RowDataPacket[]>(taskQuery, [id]);

    if (result.length === 0) {
      throw new Error("Task not found");
    }

    return result[0];
  } catch (error: any) {
    console.log(`ERROR: `, error.message);
  }
};

export const createTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignor, task, assignTo, status, priority } = req.body;
    if (!assignor || !task || !assignTo || !status || !priority) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please fill all fields");
    }

    const createTaskQuery =
      "INSERT INTO tasks (`assignor`, `task`, `assignTo`, `status`, `priority`) VALUES (?)";
    const values = [assignor, task, assignTo, status, priority];

    const [result] = await db
      .promise()
      .query<ResultSetHeader>(createTaskQuery, [values]);

    const newTaskInfo = await getTaskById(result.insertId);
    res.status(STATUS_CODE.CREATED).send(newTaskInfo);
  } catch (error) {
    next(error);
  }
};

export const getTaskDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const taskDetailsQuery = `
    SELECT
    tasks.taskId,
    assignor.name AS assignor  ,
    tasks.task ,
    assignTo.name AS assignTo,
    tasks.status ,
    tasks.priority ,
    tasks.creationDate
    FROM 
    tasks
    JOIN
    users AS assignor ON assignor.userId = tasks.assignor
    JOIN
    users AS assignTo  ON assignTo.userId = tasks.assignTo
    WHERE tasks.taskId = ?`;

    const [result] = await db
      .promise()
      .query<RowDataPacket[]>(taskDetailsQuery, [id]);

    if (result.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Task not found");
    }

    res.send(result[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedTask = await getTaskById(id);
    const taskQuery = "DELETE FROM tasks WHERE taskId = ?";

    const [result] = await db.promise().query<ResultSetHeader>(taskQuery, [id]);
    if (result.affectedRows === 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Task not found");
    }

    res.send({ message: "Task has been deleted", data: deletedTask });
  } catch (error) {
    next(error);
  }
};
