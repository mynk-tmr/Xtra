import "dotenv/config"; //to support env files
import mongoose from "mongoose";

await mongoose.connect(process.env.DATABASE_URL);
console.log("Connected to database");
