import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  email: {
    ...requiredString,
    unique: true,
  },
  password: {
    ...requiredString,
  },
  firstName: {
    ...requiredString,
  },
  lastName: {
    ...requiredString,
  },
});

export const User = mongoose.model("User", userSchema);
//User is constructor of new documents in /users and enforces the provided schema

//before calling user.save() do...
userSchema.pre("save", async (next) => {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(); //mongoose needs this
});
