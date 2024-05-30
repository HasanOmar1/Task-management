import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
