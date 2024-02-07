import express from "express";
import cors from "cors";
import "dotenv/config"; //to support env files
import mongoose from "mongoose";
import userRouter from "./routes/users";

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to database");

const app = express();
app.use(cors());
app.use(express.json()); //to recognise request body as JSON
app.use(express.urlencoded({ extended: true })); //to allow nested object creation from query strings

app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("Visit http://localhost:8000/api");
});
