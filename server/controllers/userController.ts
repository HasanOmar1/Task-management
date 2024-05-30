import db from "../database.js";
import { Request, Response, NextFunction } from "express";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const q = "INSERT INTO users ?";
};
