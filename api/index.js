import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config"; //to support env files
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routers/_authorize.js";
import userRoutes from "./routers/_users.js";
import mylistingRoutes from "./routers/_myListings.js";
import listingRoutes from "./routers/_listings.js";

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
    exposedHeaders: ["link"],
  })
);
app.use(cookieParser());
app.use(express.json()); //to recognise request body as JSON
app.use(express.urlencoded({ extended: true })); //parse req with qs-library into object/array

app.use("/api/authorize", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-listings/", mylistingRoutes);
app.use("/api/listings/", listingRoutes);

app.listen(8000, () => {
  console.log("Visit http://localhost:8000/api");
});
