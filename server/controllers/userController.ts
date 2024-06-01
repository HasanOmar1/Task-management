import db from "../database.js";
import { Request, Response, NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import STATUS_CODE from "../constants/statusCodes.js";
import { firstLetterBig } from "../utils/toUpperCase.js";

type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
  token: string;
};

const generateToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "7d",
  });
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = "SELECT * FROM users";
    const [result] = await db.promise().query<RowDataPacket[]>(q);

    if (result.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("The database is empty");
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

// helper function
const getUserById = async (userId: number): Promise<User | void> => {
  try {
    const getUser = "SELECT * FROM users WHERE userId = ?";
    const [result] = await db
      .promise()
      .query<RowDataPacket[]>(getUser, [userId]);
    if (result.length === 0) {
      throw new Error(`User not found`);
    }

    const user = result[0];
    const createdUser: User = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user.userId, user.email),
    };
    return createdUser;
  } catch (err: any) {
    console.log(`ERROR function getUserById : `, err.message);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please fill all fields");
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim().toLowerCase();

    const isEmailExists = "SELECT * FROM users WHERE email = ?";
    const [emailResult] = await db
      .promise()
      .query<RowDataPacket[]>(isEmailExists, [trimmedEmail]);

    if (emailResult.length > 0) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Email already exists");
    }

    if (password.length < 3) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Password must be at least 3 characters long");
    }

    const isNameExists = "SELECT * FROM users WHERE LOWER(name) = ?";
    const [nameResult] = await db
      .promise()
      .query<RowDataPacket[]>(isNameExists, [trimmedName]);

    if (nameResult.length > 0) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("This name is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedName = firstLetterBig(trimmedName);

    const insertQuery =
      "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
    const values = [formattedName, trimmedEmail, hashedPassword];
    const [result] = await db
      .promise()
      .query<ResultSetHeader>(insertQuery, [values]);

    const user = await getUserById(result.insertId);
    res.status(STATUS_CODE.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findUserQuery = "SELECT * FROM users WHERE userId = ?";
    const [userResult] = await db
      .promise()
      .query<RowDataPacket[]>(findUserQuery, [id]);

    if (userResult.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    } else {
      const deleteUserQuery = "DELETE FROM users WHERE userId = ?";
      const [deleteResult] = await db
        .promise()
        .query<ResultSetHeader>(deleteUserQuery, [id]);

      if (deleteResult.affectedRows === 0) {
        res.status(STATUS_CODE.NOT_FOUND);
        throw new Error("User not found");
      }
      res.send({
        message: "User deleted successfully",
        data: userResult[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
