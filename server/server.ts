import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import taskRouter from "./routes/taskRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use(errorHandler);
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
