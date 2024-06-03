import db from "../database.js";
import STATUS_CODE from "../constants/statusCodes.js";
export const createTasksTable = async (req, res, next) => {
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
        const [result] = await db.promise().query(tableQuery);
        console.log(result);
        res.send(`Table has been created`);
    }
    catch (error) {
        next(error);
    }
};
export const getAllTasks = async (req, res, next) => {
    try {
        const getTasksQuery = "SELECT * FROM tasks";
        const [tasks] = await db.promise().query(getTasksQuery);
        res.send(tasks);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllTasksDetails = async (req, res, next) => {
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
            .query(taskDetailsQuery);
        if (result.length === 0) {
            res.status(STATUS_CODE.NOT_FOUND);
            throw new Error("Task not found");
        }
        res.send(result);
    }
    catch (error) {
        next(error);
    }
};
//helper function
const getTaskById = async (id) => {
    try {
        const taskQuery = "SELECT * FROM tasks WHERE taskId = ?";
        const [result] = await db.promise().query(taskQuery, [id]);
        if (result.length === 0) {
            throw new Error("Task not found");
        }
        return result[0];
    }
    catch (error) {
        console.log(`ERROR: `, error.message);
    }
};
export const createTask = async (req, res, next) => {
    try {
        const { assignor, task, assignTo, status, priority } = req.body;
        if (!assignor || !task || !assignTo || !status || !priority) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("Please fill all fields");
        }
        const createTaskQuery = "INSERT INTO tasks (`assignor`, `task`, `assignTo`, `status`, `priority`) VALUES (?)";
        const values = [assignor, task, assignTo, status, priority];
        const [result] = await db
            .promise()
            .query(createTaskQuery, [values]);
        const newTaskInfo = await getTaskById(result.insertId);
        res.status(STATUS_CODE.CREATED).send(newTaskInfo);
    }
    catch (error) {
        next(error);
    }
};
export const getTaskDetailsById = async (req, res, next) => {
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
            .query(taskDetailsQuery, [id]);
        if (result.length === 0) {
            res.status(STATUS_CODE.NOT_FOUND);
            throw new Error("Task not found");
        }
        res.send(result[0]);
    }
    catch (error) {
        next(error);
    }
};
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await getTaskById(id);
        const taskQuery = "DELETE FROM tasks WHERE taskId = ?";
        const [result] = await db.promise().query(taskQuery, [id]);
        if (result.affectedRows === 0) {
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error("Task not found");
        }
        res.send({ message: "Task has been deleted", data: deletedTask });
    }
    catch (error) {
        next(error);
    }
};
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateTaskQuery = `UPDATE tasks
    SET ?
    WHERE taskId = ?`;
        const [result] = await db
            .promise()
            .query(updateTaskQuery, [req.body, id]);
        const updatedTask = await getTaskById(id);
        res.send(updatedTask);
    }
    catch (error) {
        next(error);
    }
};
