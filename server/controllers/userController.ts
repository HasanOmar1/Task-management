import db from "../database.js";
import { Request, Response, NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import STATUS_CODE from "../constants/statusCodes.js";
import { firstLetterBig } from "../utils/toUpperCase.js";

const generateToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "7d",
  });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const q = "SELECT * FROM users";
  db.query<RowDataPacket[]>(q, (err, result) => {
    if (err) return next(err);
    res.send(result);
  });
};

// helper function
const getUserById = (id: number) => {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query<RowDataPacket[]>(q, id, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject("User not found");
      }

      const createdUser = {
        id: result[0].id,
        email: result[0].email,
        password: result[0].password,
        token: generateToken(result[0].id, result[0].email),
      };
      resolve(createdUser);
    });
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("Please fill all fields");
    res.status(STATUS_CODE.BAD_REQUEST);
    return next(error);
  }

  const getEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query<RowDataPacket[]>(getEmailQuery, email, (err, result) => {
    if (err) return next(err);

    if (result.length > 0) {
      const error = new Error("Email already exists");
      res.status(STATUS_CODE.CONFLICT);
      return next(error);
    }

    if (password.length < 3) {
      const error = new Error("Password must be at least 3 characters long");
      res.status(STATUS_CODE.BAD_REQUEST);
      return next(error);
    }

    const getNameQuery = "SELECT * FROM users WHERE LOWER(name) = ?";
    db.query<RowDataPacket[]>(getNameQuery, name, (nameError, nameResult) => {
      if (nameError) return next(nameError);
      if (nameResult.length > 0) {
        const error = new Error("This name is already taken");
        res.status(STATUS_CODE.CONFLICT);
        return next(error);
      }
    });

    const createUserQuery =
      "INSERT INTO users(`name`,`email`, `password`) VALUES (?)";

    // hash = the hashed password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.json({ Error: "Error in hashing password" });
      const upperCaseName = firstLetterBig(name);
      const values = [upperCaseName, email, hash];
      db.query<ResultSetHeader>(
        createUserQuery,
        [values],
        async (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ Error: "Error in creating user" });
          }
          const user = await getUserById(result.insertId);
          console.log(user);
          res.json(user);
        }
      );
    });
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const findUserById = "SELECT * FROM users WHERE id = ?";

  db.query<RowDataPacket[]>(findUserById, id, (err, userResult) => {
    if (err) return next(err);
    if (userResult.length === 0) {
      const error = new Error("User not found");
      res.status(STATUS_CODE.NOT_FOUND);
      return next(error);
    }

    const deleteById = "DELETE FROM users WHERE id = ?";
    db.query<ResultSetHeader>(deleteById, id, (err, result) => {
      if (err) return next(err);
      res.send({ message: "User has been deleted", data: userResult });
    });
  });
};
