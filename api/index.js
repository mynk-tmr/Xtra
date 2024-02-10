import express from "express";
import cors from "cors";
import "dotenv/config"; //to support env files
import mongoose from "mongoose";
import userRoutes from "#routes/_users";
import authRoutes from "#routes/_authorize";
import cookieParser from "cookie-parser";

await mongoose.connect(process.env.MONGODB_URI);
console.log(
  "Connected to database",
  process.env.MONGODB_URI.includes("cluster0") ? "e2e-test" : "production"
);

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, //only allow this url
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); //to recognise request body as JSON
app.use(express.urlencoded({ extended: true })); //to allow nested object creation from query strings

app.use("/api/authorize", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log("Visit http://localhost:8000/api");
});
