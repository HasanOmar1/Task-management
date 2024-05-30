import db from "../database.js";
import { Request, Response, NextFunction } from "express";
import STATUS_CODES from "../constants/statusCodes.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const q = "SELECT * FROM users";
  db.query<RowDataPacket[]>(q, (err, result) => {
    if (err) return next(err);
    res.send(result);
  });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const q = "INSERT INTO users(email , password) VALUES (?,?)";
  const { email, password } = req.body;
  console.log(req.body);

  db.query<ResultSetHeader>(q, { email, password }, (err, result) => {
    if (err) return next(err);
    console.log(result);
    res.status(201);
    res.send(result);
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const q = "DELETE FROM users WHERE id = ?";

  db.query<ResultSetHeader>(q, id, (err, result) => {
    if (err) return next(err);

    if (!result.affectedRows) {
      res.status(STATUS_CODES.NOT_FOUND);
      res.send(`User with the id of ${id} does not exist`);
    } else {
      res.send(result);
    }
  });
};
