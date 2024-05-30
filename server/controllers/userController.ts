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
  const q = "INSERT INTO users SET ?";
  const { email, password } = req.body;

  try {
    if (password.length < 3) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Password must be at least 3 characters");
    }

    db.query<ResultSetHeader>(q, { email, password }, (err, result) => {
      if (err) {
        return next(err);
      }

      const createdUserId = result.insertId;
      const getUserQuery = "SELECT * from users WHERE id = ?";
      db.query<RowDataPacket[]>(getUserQuery, createdUserId, (err, result) => {
        if (err) return next(err);

        res.status(STATUS_CODES.CREATED).send(result);
      });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const q = "DELETE FROM users WHERE id = ?";

  db.query<ResultSetHeader>(q, id, (err, result) => {
    if (err) return next(err);

    if (!result.affectedRows) {
      res.status(STATUS_CODES.NOT_FOUND);
      res.send({
        ok: false,
        message: `User with the id of ${id} does not exist.`,
      });
    } else {
      res.send({
        ok: true,
        message: `User with the id of ${id} has been deleted!`,
      });
    }
  });
};
