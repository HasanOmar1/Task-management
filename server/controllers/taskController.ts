import db from "../database.js";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest.js";
import STATUS_CODE from "../constants/statusCodes.js";
import { ResultSetHeader } from "mysql2";

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
