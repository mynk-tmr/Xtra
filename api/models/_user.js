import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const requiredString = {
  type: String,
  required: true,
};

const uniqueString = {
  ...requiredString,
  unique: true,
};

const requiredDate = {
  type: Date,
  required: true,
};

const bookingType = {
  assetId: uniqueString,
  createdAt: requiredDate,
};

const userSchema = new mongoose.Schema({
  email: uniqueString,
  password: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  bookings: [bookingType],
});

//pre hook (before save)  [don't use arrow fn, this must be runtime bound]
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(); //mongoose needs this
});

//User is class for any user in "users" collection
//create this AFTER assigning all hooks & methods on schema
const User = mongoose.model("User", userSchema);

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

function createUser(userData) {
  return new User(userData);
}

export { User, createUser, getUserByEmail };
