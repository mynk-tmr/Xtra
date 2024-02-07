import "dotenv/config"; //to support env files
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to database");
