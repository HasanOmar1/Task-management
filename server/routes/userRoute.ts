import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";
import bcrypt from "bcryptjs";
import db from "../database.js";

const route = express.Router();

route.get("/", getUsers);
route.post("/create", createUser);

// route.post("/create", (req, res) => {
//   const sql = "INSERT INTO users (`email`,`password`) VALUES (?)";
//   bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
//     if (err) return res.json({ Error: "Error in hashing password" });
//     const values = [req.body.email, hash];
//     db.query(sql, [values], (err, result) => {
//       if (err) return res.json({ Error: "Error query" });
//       return res.json({ Status: "Success" });
//     });
//   });
// });

route.delete("/delete/:id", deleteUser);

export default route;
